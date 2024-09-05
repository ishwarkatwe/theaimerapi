import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schemas';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/common/service/email/email.service';
import { VerifyDto } from 'src/auth/dto/verify.dto';
import { ResetDto } from 'src/auth/dto/reset.dto';
import { UpdatePasswordDto } from 'src/auth/dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly emailService: EmailService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string) {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async updateUserOtp(email: string) {
    const otp = this.generateOtp();
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10);

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    await this.userModel.findByIdAndUpdate(user.id, {
      otp,
      otpExpiresAt,
    });

    this.emailService.sendOtpMail({
      email: user.email,
      username: user.username,
      otp: otp,
    });

    return 'OTP Email sent successfully!';
  }

  async verifyOtp(verifyDto: VerifyDto): Promise<boolean> {
    const user = await this.userModel.findOne({ email: verifyDto.email });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    if (user.isVerified) {
      throw new BadRequestException('User already verified.');
    }

    if (user.otp !== verifyDto.code || new Date() > user.otpExpiresAt) {
      throw new BadRequestException('Invalid or expired OTP.');
    }

    user.isVerified = true;
    user.otp = undefined; // Clear the OTP
    user.otpExpiresAt = undefined; // Clear the OTP expiration time
    await user.save();

    return true;
  }

  async resetPassword(resetDto: ResetDto) {
    const resetPasswordToken = this.generateOtp(20);
    const resetPasswordExpiresAt = new Date();
    resetPasswordExpiresAt.setMinutes(resetPasswordExpiresAt.getMinutes() + 15);

    const user = await this.userModel.findOne({ email: resetDto.email }).exec();
    if (!user) {
      throw new NotFoundException(
        `User with email ${resetDto.email} not found`,
      );
    }

    await this.userModel.findByIdAndUpdate(user.id, {
      resetPasswordToken,
      resetPasswordExpiresAt,
    });

    this.emailService.sendPasswordResetMail({
      email: user.email,
      username: user.username,
      resetUrl:
        process.env.FEBASEURL +
        `?email=${user.email}&token=${resetPasswordToken}`,
    });

    return 'Password reset mail sent successfully!';
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
    const user = await this.userModel.findOne({
      email: updatePasswordDto.email,
    });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    if (
      user.resetPasswordToken !== updatePasswordDto.resetPasswordToken ||
      new Date() > user.resetPasswordExpiresAt
    ) {
      throw new BadRequestException('Invalid or expired request.');
    }

    const saltOrRounds = 10;
    const hashPw = await bcrypt.hash(updatePasswordDto.password, saltOrRounds);

    user.password = hashPw;
    user.resetPasswordExpiresAt = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    return true;
  }

  generateOtp(len = 3): string {
    return crypto.randomBytes(len).toString('hex').toUpperCase(); // Generate a 6-character OTP
  }
}

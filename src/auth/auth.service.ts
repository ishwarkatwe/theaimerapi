import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginResDto } from './dto/login-res.dto';
import { LoginDto } from './dto/login.dto';
import { UserResDto } from 'src/user/dto/create-res.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { VerifyDto } from './dto/verify.dto';
import { ResetDto } from './dto/reset.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<LoginResDto> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    } else if (
      user &&
      !Boolean(await bcrypt.compare(password, user.password))
    ) {
      throw new UnauthorizedException();
    }

    if (!user.isVerified) {
      this.generateOtp(user.email);
    }

    return {
      isVerified: user.isVerified,
      access_token: await this.jwtService.signAsync({
        email: user.email,
        username: user.username,
        role: user.role,
      }),
    };
  }

  async register(createUser: CreateUserDto): Promise<UserResDto> {
    const saltOrRounds = 10;
    const originalPw = createUser.password;
    const hashPw = await bcrypt.hash(createUser.password, saltOrRounds);
    const user = await this.usersService.create({
      ...createUser,
      password: hashPw,
    });
    const login: LoginDto = {
      email: user.email,
      password: originalPw,
    };
    const autoLogin = await this.login(login);

    if (!user) {
      throw new NotAcceptableException(`User not registered, Please retry !`);
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      access_token: autoLogin.access_token,
    };
  }

  generateOtp(email: string) {
    return this.usersService.updateUserOtp(email);
  }

  verifyOtp(verifyDto: VerifyDto) {
    return this.usersService.verifyOtp(verifyDto);
  }

  resetPassword(resetDto: ResetDto) {
    return this.usersService.resetPassword(resetDto);
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.updatePassword(updatePasswordDto);
  }

  generateOtpCode() {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); // Generate a 6-character OTP
  }
}

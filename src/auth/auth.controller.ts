import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResDto } from './dto/login-res.dto';
import { UserResDto } from 'src/user/dto/create-res.dto';
import { VerifyDto } from './dto/verify.dto';
import { ResetDto } from './dto/reset.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Return access tokan on successful login',
    type: LoginResDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiCreatedResponse({
    description: 'User created successfully',
    type: UserResDto,
  })
  @ApiNotAcceptableResponse({ description: 'User not registered' })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiCreatedResponse({
    description: 'Generate OTP for email verification',
  })
  @Get('otp/:email')
  otp(@Param('email') email: string) {
    return this.authService.generateOtp(email);
  }

  @ApiCreatedResponse({
    description: 'Verify OTP for email verification',
  })
  @Post('verify')
  verify(@Body() verifyDto: VerifyDto) {
    return this.authService.verifyOtp(verifyDto);
  }

  @ApiCreatedResponse({
    description: 'Verify OTP for email verification',
  })
  @Post('reset')
  reset(@Body() resetDto: ResetDto) {
    return this.authService.resetPassword(resetDto);
  }

  @ApiCreatedResponse({
    description: 'Request for update password with valid token',
  })
  @Patch('password')
  password(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(updatePasswordDto);
  }
}

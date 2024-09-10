import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResDto } from './dto/login-res.dto';
import { UserResDto } from './../user/dto/create-res.dto';
import { VerifyDto } from './dto/verify.dto';
import { ResetDto } from './dto/reset.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Public } from './decorator/public.decorator';

@Public()
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Return access tokan on successful login',
    type: LoginResDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Public()
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
  @Get('send-email-otp/:email')
  otp(@Param('email') email: string) {
    return this.authService.generateOtp(email);
  }

  @ApiCreatedResponse({
    description: 'Verify OTP for email verification',
  })
  @Post('verify-email-otp')
  verify(@Body() verifyDto: VerifyDto) {
    return this.authService.verifyOtp(verifyDto);
  }

  @ApiCreatedResponse({
    description: 'Verify OTP for email verification',
  })
  @Post('reset-password')
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

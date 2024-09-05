import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User email address' , example:"user@gmail.com"})
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({ description: 'Password between 6 and 20 characters', example:"user@123" })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class VerifyDto {
  @ApiProperty({ description: 'User email address' , example:"user@gmail.com"})
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({ description: 'Otp code for email verification', example:"ED6WE4" })
  @IsNotEmpty({ message: 'Code is required' })
  @Length(6, 6, { message: 'Code must be 6 character length' })
  code: string;
}

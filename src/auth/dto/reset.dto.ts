import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResetDto {
  @ApiProperty({ description: 'User email address' , example:"user@gmail.com"})
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}

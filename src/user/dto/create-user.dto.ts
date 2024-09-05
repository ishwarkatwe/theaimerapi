import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Length,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';

export enum Role {
  SELLER = 'SELLER',
  BUYER = 'BUYER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export class CreateUserDto {
  @ApiProperty({
    description: 'Username as display name',
    example: 'Anil Kapoor',
  })
  @IsNotEmpty({ message: 'Username is required' })
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  username: string;

  @ApiProperty({
    description: 'Email address for login',
    example: 'user@gmail.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    description: 'Password between 6 and 20 characters',
    example: 'user@123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;

  @ApiProperty({
    description: 'User role as buyer or seller',
    example: 'BUYER',
  })
  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @ApiProperty({
    description: 'User status',
    example: 'ACTIVE',
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status: UserStatus;
}

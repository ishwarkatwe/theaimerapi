import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}

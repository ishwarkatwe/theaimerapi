import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, Role, UserStatus } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserResDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'UserId for user identity',
    example: '12345',
  })
  id: string;

  @ApiProperty({
    description: 'Username for display name',
    example: 'Anil K',
  })
  username: string;

  @ApiProperty({
    description: 'email for user communication',
    example: 'anil@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Access jwt token for secure auth',
  })
  access_token: string;
}

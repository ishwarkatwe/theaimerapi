import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty({
    description: 'Access jwt token for secure auth',
  })
  access_token: string;

  @ApiProperty({
    description: 'Email is verified by OTP',
  })
  isVerified: boolean;
}

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The payment method used for the order (e.g., UPI, credit card, etc.)',
    example: 'UPI',
  })
  @IsNotEmpty({ message: 'Payment method is required' })
  paymentMode: string;

  @ApiProperty({
    description: 'The shipping address for the order',
    example: '1234 Main St, Bangalore, India',
  })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @ApiProperty({
    description: 'Contact information for the order (phone number)',
    example: '+91-9876543210',
  })
  @IsNotEmpty({ message: 'Contact info is required' })
  contact: string;

  @ApiProperty({
    description: 'Email address for the order',
    example: 'customer@example.com',
  })
  @IsNotEmpty({ message: 'Email info is required' })
  email: string;
}

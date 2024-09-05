import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'Payment method is required' })
  paymentMode: string;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'Contact info is required' })
  contact: string;

  @IsNotEmpty({ message: 'Email info is required' })
  email: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty } from 'class-validator';
import { PaymentStatus } from '../schemas/order.schema';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNotEmpty({ message: 'Payment status is required' })
  paymentStatus: PaymentStatus;
}

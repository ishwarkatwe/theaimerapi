import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty } from 'class-validator';
import { PaymentStatus } from '../schemas/order.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    description: 'Payment status',
    example: 'Pending',
  })
  @IsNotEmpty({ message: 'Payment status is required' })
  paymentStatus: PaymentStatus;
}

import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { CartModule } from 'src/cart/cart.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CartModule,
    PaymentModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

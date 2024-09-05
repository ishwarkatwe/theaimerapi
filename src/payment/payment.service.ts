import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, PaymentStatus } from 'src/orders/schemas/order.schema';
// import Razorpay from 'razorpay';
const Razorpay = require('razorpay');

@Injectable()
export class PaymentService {
  private razorpay;

  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  async createPaymentOrder(amount: number, currency: string, receipt: string) {
    try {
      const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency,
        receipt,
        payment_capture: 1,
      };
      return await this.razorpay.orders.create(options);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create payment order');
    }
  }

  async updatePaymentStatus(
    orderId: string,
    status: PaymentStatus,
  ): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate(orderId, { paymentStatus: status }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}

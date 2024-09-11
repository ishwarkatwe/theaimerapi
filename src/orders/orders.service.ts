import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { Order, PaymentStatus } from './schemas/order.schema';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private cartService: CartService,
    private paymentService: PaymentService,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async createOrder(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<{
    orderId: string;
    razorpayOrderId: string;
  }> {
    const cart = await this.cartService.findByUserId(userId);
    if (!cart || cart.products.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const totalAmount = cart.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    const order = new this.orderModel({
      user: userId,
      items: cart.products,
      totalAmount,
      currency: process.env.CURRENCY,
      ...createOrderDto,
    });

    await order.save();
    await this.cartService.removeAllProductsFromCart(userId); // Clear cart after order creation

    // Create a payment order with Razorpay
    const paymentOrder = await this.paymentService.createPaymentOrder(
      totalAmount,
      'INR',
      order._id.toString(),
    );

    return {
      orderId: order.id,
      razorpayOrderId: paymentOrder.id,
    };
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
    userId: string,
  ): Promise<{ data: Order[]; total: number }> {
    const { limit, offset, sortBy, sortOrder, search } = paginationQuery;

    const filter = search
      ? { name: { $regex: search, $options: 'i' } } // Search by name (case-insensitive)
      : {};

    const total = await this.orderModel.countDocuments(filter).exec();
    const orders = await this.orderModel
      .find({ ...filter, user: userId })
      .sort({ [sortBy]: sortOrder || 'asc' })
      .skip(offset)
      .limit(limit)
      .exec();

    return { data: orders, total };
  }

  async findOne(id: string) {
    const orders = await this.orderModel.findById(id);
    if (!orders) {
      throw new NotFoundException(`Order details not found for: ${id}`);
    }
    return orders;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }
}

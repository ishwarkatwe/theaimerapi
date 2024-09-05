// src/order/order.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schemas';

export enum PaymentStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
}

export enum PaymentMode {
  UPI = 'Upi',
  COD = 'Cod',
  NETBACKING = 'NetBanking',
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop([
    {
      product: { type: Types.ObjectId, ref: Product.name },
      quantity: { type: Number, required: true },
    },
  ])
  items: { product: Types.ObjectId; quantity: number }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @Prop({ enum: PaymentMode, default: PaymentMode.COD })
  paymentMode: PaymentMode;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  currency: string;

  @Prop()
  razorpayOrderId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

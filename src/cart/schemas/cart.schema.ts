import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schemas';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Schema.Types.ObjectId | User;

  @Prop([
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ])
  products: Array<{
    product: Product;
    quantity: number;
  }>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

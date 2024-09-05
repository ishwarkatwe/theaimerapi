// src/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, default: 1 })
  parent?: string;

  @Prop({ trim: true, default: true })
  active?: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

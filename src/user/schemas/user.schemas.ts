// src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role, UserStatus } from '../dto/create-user.dto';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role, default: Role.BUYER })
  role: string;

  @Prop({ enum: UserStatus, default: UserStatus.ACTIVE })
  status: string;

  @Prop()
  otp: string;

  @Prop()
  otpExpiresAt: Date;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  resetPasswordToken: string;

  @Prop()
  resetPasswordExpiresAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

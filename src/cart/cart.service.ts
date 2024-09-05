import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { Model } from 'mongoose';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async addProductToCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.cartModel
      .findOneAndUpdate(
        { user: userId, 'products.product': { $ne: productId } }, // Add new product if it doesn't exist
        { $push: { products: { product: productId, quantity } } }, // Push new product to the array
        { new: true, upsert: true },
      )
      .exec();

    if (!cart) {
      // If product exists, update quantity
      return this.cartModel
        .findOneAndUpdate(
          { user: userId, 'products.product': productId },
          { $inc: { 'products.$.quantity': quantity } }, // Increment the quantity
          { new: true },
        )
        .exec();
    }
    return cart;
  }

  async updateProductQuantity(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.cartModel
      .findOneAndUpdate(
        { user: userId, 'products.product': productId },
        { $set: { 'products.$.quantity': quantity } }, // Set the new quantity
        { new: true },
      )
      .exec();

    if (!cart) {
      throw new NotFoundException(
        `Cart or product not found for user ID: ${userId}`,
      );
    }
    return cart;
  }

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<Cart> {
    const cart = await this.cartModel
      .findOneAndUpdate(
        { user: userId },
        { $pull: { products: { product: productId } } }, // Pull the product from the products array
        { new: true },
      )
      .exec();

    if (!cart) {
      throw new NotFoundException(
        `Cart or product not found for user ID: ${userId}`,
      );
    }
    return cart;
  }

  async removeAllProductsFromCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel
      .findOneAndUpdate(
        { user: userId },
        { $set: { products: [] } }, // Set the products array to an empty array
        { new: true },
      )
      .exec();

    if (!cart) {
      throw new NotFoundException(`Cart not found for user ID: ${userId}`);
    }
    return cart;
  }

  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartModel
      .findOne({ user: userId })
      .populate('products.product', 'name description price')
      .exec();

    if (!cart) {
      throw new NotFoundException(`Cart not found for user ID: ${userId}`);
    }
    return cart;
  }
}

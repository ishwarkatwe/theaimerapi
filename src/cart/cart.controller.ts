import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findByUserId(id);
  }

  @Post(':userId/product/:productId')
  async addProductToCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.addProductToCart(userId, productId, quantity);
  }

  @Patch(':userId/product/:productId')
  async updateProductQuantity(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateProductQuantity(userId, productId, quantity);
  }

  @Delete(':userId/product/:productId')
  async removeProductFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeProductFromCart(userId, productId);
  }

  @Delete(':userId')
  async removeAllProductsFromCart(@Param('userId') userId: string) {
    return this.cartService.removeAllProductsFromCart(userId);
  }
}

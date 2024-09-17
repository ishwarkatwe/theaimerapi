import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Cart')
@ApiBearerAuth('jwt')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findOne(@Req() req: Request) {
    const userId = req['user'].userId;
    return this.cartService.findByUserId(userId);
  }

  @Post('product/:productId')
  async addProductToCart(
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
    @Req() req: Request,
  ) {
    const userId = req['user'].userId;
    return this.cartService.addProductToCart(userId, productId, quantity);
  }

  @Patch('product/:productId')
  async updateProductQuantity(
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
    @Req() req: Request,
  ) {
    const userId = req['user'].userId;
    return this.cartService.updateProductQuantity(userId, productId, quantity);
  }

  @Delete('product/:productId')
  async removeProductFromCart(
    @Param('productId') productId: string,
    @Req() req: Request,
  ) {
    const userId = req['user'].userId;
    return this.cartService.removeProductFromCart(userId, productId);
  }

  @Delete()
  async removeAllProductsFromCart(@Req() req: Request) {
    const userId = req['user'].userId;
    return this.cartService.removeAllProductsFromCart(userId);
  }
}

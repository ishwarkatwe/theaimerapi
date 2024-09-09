import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.productService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Put(':id/like/:userId')
  addLike(@Param('id') productId: string, @Param('userId') userId: string) {
    return this.productService.addLike(productId, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Put(':productId/likes/:userId')
  addToLikes(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
  ) {
    return this.productService.addToLikes(productId, userId);
  }

  @Delete(':productId/likes/:userId')
  removeFromLikes(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
  ) {
    return this.productService.removeFromLikes(productId, userId);
  }

  @Put(':productId/wishlist/:userId')
  addToWishList(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
  ) {
    return this.productService.addToWishList(productId, userId);
  }

  @Delete(':productId/wishlist/:userId')
  removeFromWishList(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
  ) {
    return this.productService.removeFromWishList(productId, userId);
  }
}

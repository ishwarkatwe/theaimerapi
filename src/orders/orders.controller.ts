import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth('jwt')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const userId = req['user'].userId;
    return this.ordersService.createOrder(userId, createOrderDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto, @Req() req: Request) {
    const userId = req['user'].userId;
    return this.ordersService.findAll(paginationQuery, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }
}

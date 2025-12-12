/**
 * Заказ. Контроллер
 */

import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderData: OrderDTO) {
    return this.orderService.createOrder(orderData);
  }
}

/**
 * Модуль для заказов
 */

import { Module } from '@nestjs/common';

/* Всё про фильмы */
import { FilmsModule } from 'src/films/films.module';

/* Всё про заказ */
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [FilmsModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

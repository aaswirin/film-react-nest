/**
 * Все модули приложения
 */

import { Module } from '@nestjs/common';
//import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
//import * as path from 'node:path';

import { configProvider } from './app.config.provider';
/* Всё про фильмы */
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
/* Всё про заказ */
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, OrderService],
})
export class AppModule {}

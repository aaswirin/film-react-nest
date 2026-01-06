/**
 * Все модули приложения
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import configuration, { appConfig } from './configuration';

/* Всё про фильмы */
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { FilmsRepository } from './repository/films/films.repository';
import { FilmSchema } from './repository/films/films.types';

/* Всё про заказ */
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderRepository } from './repository/orders/order.repository';
import { OrderSchema } from './repository/orders/order.types';

/**
 * Для отладки
 * если DEBUG=*, то показываем запросы к MongoDB
 */
if (appConfig.DEBUG === '*') {
  mongoose.set('debug', true);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'film', schema: FilmSchema },
      { name: 'orders', schema: OrderSchema },
    ]),
    WinstonModule.forRoot({
      levels: {
        critical_error: 0,
        error: 1,
        special_warning: 2,
        another_log_level: 3,
        info: 4,
      },
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({
          filename: './log/error.log',
          level: 'error',
        }),
      ],
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [FilmsService, FilmsRepository, OrderService, OrderRepository],
})
export class AppModule {}

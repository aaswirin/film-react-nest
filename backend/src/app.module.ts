/**
 * Все модули приложения
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { configProvider } from './app.config.provider';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

/* Всё про фильмы */
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { FilmsRepository } from './repository/films.repository';
import { FilmSchema } from './repository/films.types';

/* Всё про заказ */
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderRepository } from './repository/order.repository';
import { OrderSchema } from './repository/order.types';

// TODO сделать через параметр
import mongoose from 'mongoose';
mongoose.set('debug', true);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'film', schema: FilmSchema },
      { name: 'order', schema: OrderSchema },
    ]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsService,
    FilmsRepository,
    OrderService,
    OrderRepository,
  ],
})
export class AppModule {}

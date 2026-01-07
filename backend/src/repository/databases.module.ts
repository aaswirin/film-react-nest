/**
 * Все базы данных
 */

import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration, { appConfig } from '../configuration';

/* Всё про фильмы */
import { FilmSchema } from './films/films.types';
import { FilmsRepository } from './films/films.repository';
import { FilmsService } from '../films/films.service';

/* Всё про заказ */
import { OrderSchema } from './orders/order.types';
import { OrderRepository } from './orders/order.repository';
import { OrderService } from '../order/order.service';

@Global()
@Module({})
export class DatabasesModule {
  static forRootAsync(): DynamicModule {
    const driver = appConfig.DATABASE_DRIVER;
    const imports = [
      ConfigModule.forRoot({
        load: [configuration],
      }),
    ];
    const providers = [];

    switch (driver) {
      // MongoDB
      case 'mongodb':
        imports.push(
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
        );

        providers.push(FilmsService);
        providers.push(FilmsRepository);
        providers.push(OrderService);
        providers.push(OrderRepository);

        break;
      // PostgreSQL
      case 'postgres':
        break;
    }

    return {
      module: DatabasesModule,
      imports: imports,
      providers: providers,
      exports: providers,
    };
  }
}

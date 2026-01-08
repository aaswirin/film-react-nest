/**
 * Все базы данных
 */

import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration, { appConfig } from '../configuration';

/* Всё про фильмы */
import { FilmSchema } from './films/films.types';
import { FilmsRepositoryMongoDB } from './films/films.repository.mongodb';
import { FilmsRepositoryPostgreSQL } from './films/films.repository.postgresql';
import { FilmEntity, ScheduleEntity } from '../films/dto/film.entity';

/* Всё про заказ */
import { OrderSchema } from './orders/order.types';
import { OrderRepositoryMongoDB } from './orders/order.repository.mongodb';
import { OrderRepositoryPostgreSQL } from './orders/order.repository.postgresql';

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
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              uri: `${configService.get<string>('database.url')}:${configService.get<string>('database.port')}/${configService.get<string>('database.databaseName')}`,
            }),
          }),
          MongooseModule.forFeature([
            { name: 'film', schema: FilmSchema },
            { name: 'orders', schema: OrderSchema },
          ]),
        );

        providers.push(FilmsRepositoryMongoDB, OrderRepositoryMongoDB);

        break;
      // PostgreSQL
      case 'postgres':
        imports.push(
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              type: 'postgres',
              host: config.get('database.url'),
              port: Number(config.get('database.port')),
              database: config.get('database.databaseName'),
              username: config.get('database.username'),
              password: config.get('database.password'),
              entities: [FilmEntity, ScheduleEntity],
              synchronize: false,
            }),
          }),
          TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
        );

        providers.push(FilmsRepositoryPostgreSQL, OrderRepositoryPostgreSQL);
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

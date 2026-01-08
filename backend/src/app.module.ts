/**
 * Все модули приложения
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import mongoose from 'mongoose';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import configuration, { appConfig } from './configuration';

/* Всё про БД */
import { DatabasesModule } from './repository/databases.module';
import { OrderModule } from './order/order.module';
import { FilmsModule } from './films/films.module';
import { FilmsService } from './films/films.service';

/**
 * Для отладки
 * если DEBUG=*, то показываем запросы к MongoDB
 */
// TODO отладка в PostgreSQL?
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
    DatabasesModule.forRootAsync(),
    OrderModule,
    FilmsModule,
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
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

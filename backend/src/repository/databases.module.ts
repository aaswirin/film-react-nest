/**
 * Все базы данных
 */

import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../configuration';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
})
export class DatabasesModule {
  static forRootAsync(): DynamicModule {
    const driver = process.env.DATABASE_DRIVER || 'postgres';

    switch (driver) {
      case 'mongo':
        break;
      case 'postgres':
        break;
    }

    return {
      module: null,
      imports: null,
      providers: null,
      exports: null,
    };
  }
}

/**
 * Главный провайдер
 */

import { ConfigModule } from '@nestjs/config';

const appConfig = process.env;

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      url: appConfig.DATABASE_URL,
      driver: appConfig.DATABASE_DRIVER,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

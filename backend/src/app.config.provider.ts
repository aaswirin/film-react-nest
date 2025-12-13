/**
 * Настройки приложения
 */

import { ConfigModule } from '@nestjs/config';

export const appConfig = process.env;

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      url: appConfig.DATABASE_URL, // URL к базе данных
      driver: appConfig.DATABASE_DRIVER, // Тип базы данных
      daysToDeleteOrders: appConfig.DATABASE_DAYS_TO_DELETE_ORDER, // Количество дней до зачистки заказов
    },
    debug: appConfig.DEBUG,
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
  debug: string;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  daysToDeleteOrders: string;
}

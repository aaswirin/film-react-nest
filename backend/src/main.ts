/**
 * Самый главный файл приложения
 */

import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { appConfig } from './configuration';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TskvLogger } from './loggers/tskv';
import { JsonLogger } from './loggers/json';
import { DevLogger } from './loggers/dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // хранить логи в памяти до подключения логгера,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // Логгер
  switch (appConfig.logger) {
    case 'winston':
      app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
      break;
    case 'dev':
      app.useLogger(new DevLogger());
      break;
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
    default:
    // Без логгера
  }
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000);
}

bootstrap();

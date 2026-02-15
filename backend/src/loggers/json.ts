/**
 * Модуль для "Логгер для машин"
 */

import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  /**
   * Форматирование сообщения
   * @param level - уровень сообщения
   * @param message - собственно сообщение
   * @param optionalParams - параметры
   */
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    return JSON.stringify({ level, message, optionalParams });
  }

  /**
   * Уровень 'log'
   * @param message - собственно сообщение
   * @param optionalParams - параметры
   */
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  /**
   * Уровень 'error'
   * @param message - собственно сообщение
   * @param optionalParams - параметры
   */
  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  /**
   * Уровень 'warn'
   * @param message - собственно сообщение
   * @param optionalParams - параметры
   */
  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  /**
   * Уровень 'debug'
   * @param message - собственно сообщение
   * @param optionalParams - параметры
   */
  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }
}

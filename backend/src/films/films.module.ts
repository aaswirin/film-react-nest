/**
 * Модуль для фильмов
 */

import { Module } from '@nestjs/common';

/* Всё про фильмы */
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}

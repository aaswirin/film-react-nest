/**
 * Фильмы. Контроллер
 */

import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ResponseFilms, ResponseShedule } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<ResponseFilms> {
    const films = this.filmsService.getAll();
    return films;
  }

  @HttpCode(200)
  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string): Promise<ResponseShedule> {
    return this.filmsService.getSessions(id);
  }
}

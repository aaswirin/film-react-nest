/**
 * Фильмы. Сервис
 */

import { Injectable } from '@nestjs/common';
import {
  FilmDTO,
  ResponseFilms,
  SheduleDTO,
  ResponseShedule,
} from './dto/films.dto';
import { FilmsRepository } from '../repository/films/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  /**
   * Отдать все фильмы
   * @return ResponseFilms - список фильмов
   **/
  async getAll(): Promise<ResponseFilms> {
    const films: FilmDTO[] = await this.filmsRepository.getFilms();
    const total: number = films.length;

    return {
      total: total,
      items: films,
    };
  }

  /**
   * Отдать сеансы по id фильма
   * @param id - id фильма
   * @return ResponseShedule - сеансы фильма
   */
  async getSessions(id: string): Promise<ResponseShedule> {
    const film: FilmDTO[] = await this.filmsRepository.getSchedule(id);
    const sessions: SheduleDTO[] = film[0].schedule;
    const total: number = sessions.length;

    return {
      total: total,
      items: sessions,
    };
  }
}

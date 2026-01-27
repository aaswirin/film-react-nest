/**
 * Репозиторий для фильмов. PostgreSQL
 */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { FilmEntity, ScheduleEntity } from '../../films/dto/film.entity';
import { FilmDTO } from '../../films/dto/films.dto';
import { SalePlaceDTO } from '../../order/dto/order.dto';
import { FilmsRepository } from './films.types';

@Injectable()
export class FilmsRepositoryPostgreSQL extends FilmsRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly films: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly schedules: Repository<ScheduleEntity>,
  ) {
    super();
  }

  /**
   * Получить список фильмов
   * @return FilmDTO[] - список фильмов
   */
  async getFilms(): Promise<FilmDTO[]> {
    return (await this.films.find({ order: { title: 'ASC' } })).map((item) => ({
      ...item,
      tags: item.tags.split(',').filter(Boolean),
      schedule: [],
    }));
  }

  /**
   * Получить фильм с расписанием
   * @param id - ID фильма
   * @return FilmDTO[] - фильм
   */
  async getSchedule(id: string): Promise<FilmDTO[]> {
    const film = await this.films.findOne({ where: { id } });
    if (!film) {
      return null;
    }
    const schedule = await this.schedules.find({
      where: { filmId: id },
      order: { daytime: 'ASC' },
    });

    return [
      {
        ...film,
        tags: film.tags.split(',').filter(Boolean),
        schedule: schedule.map((item) => ({
          ...item,
          taken: item.taken.split(',').filter(Boolean),
        })),
      },
    ];
  }

  /**
   * Свободное место?
   * @param orderData - заказ
   * @return boolean - результат проверки
   */
  async getFreePlace(orderData: SalePlaceDTO): Promise<boolean> {
    const freePlace = await this.schedules.find({
      where: {
        id: orderData.id,
        filmId: orderData.film,
        taken: Like(`%${orderData.place}%`),
      },
    });
    return !freePlace.length;
  }

  /**
   * Продать место
   * @param orderData - заказ
   * @return boolean - продано
   */
  async salePlace(orderData: SalePlaceDTO): Promise<boolean> {
    const id = orderData.id;
    const schedule = await this.schedules.findOne({
      where: { id },
    });
    if (!schedule) throw NotFoundException;

    const taken = schedule.taken.split(',').filter(Boolean);

    if (taken.includes(orderData.place)) throw BadRequestException;

    taken.push(orderData.place);

    await this.schedules.update({ id }, { taken: taken.join(',') });
    return true;
  }
}

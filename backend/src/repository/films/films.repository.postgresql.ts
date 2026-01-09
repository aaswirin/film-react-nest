/**
 * Репозиторий для фильмов. PostgreSQL
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    //const films: FilmDTO[] = await this.filmsModel.find({});
    const films: FilmDTO[] = (await this.films.find()).map((item) => ({
      ...item,
      schedule: [],
    }));
    return films;
  }

  /**
   * Получить фильм с расписанием
   * @param id - ID фильма
   * @return FilmDTO[] - фильм
   */
  async getSchedule(id: string): Promise<FilmDTO> {
    //const film: FilmDTO[] = await this.filmsModel.find({ id: id }, { _id: 0 });
    //return film;

    const film = await this.films.findOne({ where: { id } });
    if (!film) {
      return null;
    }
    const schedule = await this.schedules.find({ where: { filmId: id } });

    return {
      ...film,
      schedule: schedule.map((item) => ({
        ...item,
        taken: item.taken.split(','),
      })),
    };
  }

  /**
   * Свободное место?
   * @param orderData - заказ
   * @return boolean - результат проверки
   */
  async getFreePlace(orderData: SalePlaceDTO): Promise<boolean> {
    const freePlace = await this.filmsModel.findOne({
      id: orderData.film,
      'shedule.id': orderData.session,
      'shedule.taken': orderData.place,
    });

    return !freePlace;
  }

  /**
   * Продать место
   * @param orderData - заказ
   * @return boolean - продано
   */
  async salePlace(orderData: SalePlaceDTO): Promise<boolean> {
    const res = await this.filmsModel.updateOne(
      {
        id: orderData.film,
        'schedule.id': orderData.session,
      },
      {
        $addToSet: {
          'schedule.$[s].taken': orderData.place,
        },
      },
      {
        arrayFilters: [{ 's.id': orderData.session }],
      },
    );

    return res.modifiedCount > 0;
  }
}

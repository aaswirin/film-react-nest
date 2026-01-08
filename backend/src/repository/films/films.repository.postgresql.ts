/**
 * Репозиторий для фильмов. PostgreSQL
 */

import { Injectable } from '@nestjs/common';
import { FilmDocument, FilmsRepository } from './films.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDTO } from '../../films/dto/films.dto';
import { SalePlaceDTO } from '../../order/dto/order.dto';

@Injectable()
export class FilmsRepositoryPostgreSQL extends FilmsRepository {
  constructor(@InjectModel('film') private filmsModel: Model<FilmDocument>) {
    super();
  }

  /**
   * Получить список фильмов
   * @return FilmDTO[] - список фильмов
   */
  async getFilms(): Promise<FilmDTO[]> {
    const films: FilmDTO[] = await this.filmsModel.find({});
    return films;
  }

  /**
   * Получить фильм с расписанием
   * @param id - ID фильма
   * @return FilmDTO[] - фильм
   */
  async getSchedule(id: string): Promise<FilmDTO[]> {
    const film: FilmDTO[] = await this.filmsModel.find({ id: id }, { _id: 0 });
    return film;
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

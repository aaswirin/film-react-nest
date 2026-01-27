/**
 * Фильмы. Структура данных
 */

import {
  IsMongoId,
  IsDateString,
  IsNumber,
  IsArray,
  IsFQDN,
  IsString,
  IsInt,
  Min,
} from 'class-validator';

/**
 * Расписание
 */
export class SheduleDTO {
  @IsMongoId()
  id: string; // ID заказа
  @IsDateString()
  daytime: string; // Дата заказа
  @IsInt()
  @Min(0)
  hall: number; // Зал
  @IsInt()
  @Min(1)
  rows: number; // Ряд
  @IsInt()
  @Min(1)
  seats: number; // Место
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number; // Цена
  @IsArray()
  taken: string[]; // Продано
}

/* Ответка расписанием клиенту */
export class ResponseShedule {
  total: number;
  items: SheduleDTO[];
}

/* Фильмы */
export class FilmDTO {
  @IsMongoId()
  id: string; // ID фильма
  @IsNumber()
  rating: number; // Рейтинг
  @IsString()
  director: string; // Режиссёр
  @IsArray()
  tags: string[]; // Теги
  @IsFQDN()
  image: string; // Изображение
  @IsFQDN()
  cover: string; // Афиша
  @IsString()
  title: string; // Название
  @IsString()
  about: string; // О фильме
  @IsString()
  description: string; // Описание
  @IsArray()
  schedule: SheduleDTO[]; // Расписание
}

/* Ответка фильмами клиенту */
export class ResponseFilms {
  total: number;
  items: FilmDTO[];
}

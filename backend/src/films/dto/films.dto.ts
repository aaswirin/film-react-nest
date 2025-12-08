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
  taken: string[]; // Получено??
}

/* Фильмы */
export class FilmDTO {
  @IsMongoId()
  id: string; // ID заказа
  @IsString()
  rating: string; // Рейтинг
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
  schedule?: SheduleDTO[]; // Расписание
}

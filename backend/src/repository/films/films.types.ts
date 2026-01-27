/**
 * Типы для фильмов
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FilmDTO } from 'src/films/dto/films.dto';
import { SalePlaceDTO } from 'src/order/dto/order.dto';

export abstract class FilmsRepository {
  abstract getFilms(): Promise<FilmDTO[]>;
  abstract getSchedule(id: string): Promise<FilmDTO[]>;
  abstract getFreePlace(orderData: SalePlaceDTO): Promise<boolean>;
  abstract salePlace(orderData: SalePlaceDTO): Promise<boolean>;
  static TOKEN = 'FILM';
}

/**
 * Расписание
 */
@Schema()
export class Schedule {
  @Prop({ required: true })
  id: string;
  @Prop({ type: String, default: '' })
  daytime: string;
  @Prop({ type: Number, default: '' })
  hall: number;
  @Prop({ type: Number, default: '' })
  rows: number;
  @Prop({ type: Number, default: '' })
  seats: number;
  @Prop({ type: Number, default: '' })
  price: number;
  @Prop({ type: [String], default: [] })
  taken: string[];
}

@Schema()
export class Film {
  @Prop({ type: Types.ObjectId, required: true })
  id: string;
  @Prop({ type: Number, default: '' })
  rating: number;
  @Prop({ type: String, default: '' })
  director: string;
  @Prop({ type: [String], default: [] })
  tags: string[];
  @Prop({ type: String, default: '' })
  image: string;
  @Prop({ type: String, default: '' })
  cover: string;
  @Prop({ type: String, default: '' })
  title: string;
  @Prop({ type: String, default: '' })
  about: string;
  @Prop({ type: String, default: '' })
  description: string;
  @Prop({ type: [Schedule], default: [] })
  schedule: Schedule[];
}

export type FilmDocument = Film & Document;

export const FilmSchema = SchemaFactory.createForClass(Film);

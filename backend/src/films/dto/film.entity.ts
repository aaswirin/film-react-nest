/**
 * Сущность для фильма
 */

import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsDateString,
  IsFQDN,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

@Entity('films')
export class FilmEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string; // ID фильма
  @Column()
  @IsString()
  rating: number; // Рейтинг
  @Column()
  @IsString()
  director: string; // Режиссёр
  @Column()
  @IsString()
  tags: string; // Теги
  @Column()
  @IsFQDN()
  image: string; // Изображение
  @Column()
  @IsFQDN()
  cover: string; // Афиша
  @Column()
  @IsString()
  title: string; // Название
  @Column()
  @IsString()
  about: string; // О фильме
  @Column()
  @IsString()
  description: string; // Описание
  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film)
  schedules: ScheduleEntity[];
}

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  @IsUUID()
  id: string; // ID сеанса
  @Column()
  @IsDateString()
  daytime: string; // Дата заказа
  @Column()
  @IsInt()
  @Min(0)
  hall: number; // Зал
  @Column()
  @IsInt()
  @Min(1)
  rows: number; // Ряд
  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number; // Цена
  @Column()
  seats: number;
  @Column()
  @IsString()
  taken: string; // Продано
  @Column()
  @IsUUID()
  filmId: string; // Ссылка на фильм
  @ManyToOne(() => FilmEntity, (film) => film.schedules)
  @JoinColumn({ name: 'filmId' })
  film: FilmEntity;
}

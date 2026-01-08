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
import { IsUUID } from 'class-validator';

@Entity()
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  @IsUUID()
  id: string;
  @Column()
  daytime: string;
  @Column()
  hall: number;
  @Column()
  price: number;
  @Column()
  rows: number;
  @Column()
  seats: number;
  @Column()
  taken?: string;
  @Column()
  filmId: string;
  @ManyToOne(() => FilmEntity, (film) => film.schedules)
  @JoinColumn({ name: 'filmId' })
  film: FilmEntity;
}

@Entity()
export class FilmEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string; // ID фильма
  @Column()
  rating: number;
  @Column()
  director: string;
  @Column()
  tags: string[];
  @Column()
  image: string;
  @Column()
  cover: string;
  @Column()
  title: string;
  @Column()
  about: string;
  @Column()
  description: string;
  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film)
  schedules: ScheduleEntity[];
}

/**
 * Заказ. Структура данных
 */

import {
  IsMongoId,
  IsInt,
  Min,
  IsArray,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

/* Билет */
export class TicketDto {
  @IsMongoId()
  film: string; // ID фильма
  @IsMongoId()
  session: string; // ID сессии??
  @IsInt()
  @Min(1)
  row: number; // Ряд
  @IsInt()
  @Min(1)
  seat: number; // Место
}

/* Заказ */
export class OrderDto {
  @IsOptional()
  @IsEmail()
  email?: string; // Почта
  @IsOptional()
  @IsPhoneNumber()
  phone?: string; // Телефон
  @IsArray()
  tickets: TicketDto[]; // Билеты
}

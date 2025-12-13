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
  IsString,
} from 'class-validator';

/* Билет */
export class TicketDTO {
  @IsMongoId()
  film: string; // ID фильма
  @IsMongoId()
  session: string; // ID сеанса
  @IsInt()
  @Min(1)
  row: number; // Ряд
  @IsInt()
  @Min(1)
  seat: number; // Место
}

/* Заказ */
export class OrderDTO {
  @IsOptional()
  @IsMongoId()
  id: string; // ID заказа
  @IsOptional()
  @IsEmail()
  email: string; // Почта
  @IsOptional()
  @IsPhoneNumber()
  phone: string; // Телефон
  @IsArray()
  tickets: TicketDTO[]; // Билеты
}

/* Проданное место */
export class SalePlaceDTO {
  @IsOptional()
  @IsMongoId()
  if?: string;
  @IsMongoId()
  film: string; // ID фильма
  @IsMongoId()
  session: string; // ID сеанса
  @IsString()
  place: string; // Место
}
/* Ответка заказом клиенту */
export class ResponseOrder {
  message?: string;
  error?: string;
  total?: number;
  items?: SalePlaceDTO[];
}

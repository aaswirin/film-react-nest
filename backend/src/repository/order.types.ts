/**
 * Типы для заказов
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TicketDTO } from '../order/dto/order.dto';

@Schema()
export class Order {
  @Prop({ required: true })
  id: string;
  email: string; // Почта
  phone: string; // Телефон
  tickets: TicketDTO[]; // Билеты
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);

export type TOrder = {
  id: string;
  email: string; // Почта
  phone: string; // Телефон
  tickets: TicketDTO[]; // Билеты
};

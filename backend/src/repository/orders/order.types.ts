/**
 * Типы для заказов
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TicketDTO } from '../../order/dto/order.dto';

@Schema()
export class Order {
  @Prop({ type: String, default: '' })
  email: string; // Почта
  @Prop({ type: String, default: '' })
  phone: string; // Телефон
  @Prop({ type: Date, default: new Date() })
  date: Date; // Дата и время заказа
  @Prop({ type: [TicketDTO], default: [] })
  tickets: TicketDTO[]; // Билеты
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);

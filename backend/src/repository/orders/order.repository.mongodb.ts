/**
 * Репозиторий для заказа. MongoDB
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument, OrderRepository } from './order.types';
import { OrderDTO } from 'src/order/dto/order.dto';
import { ConfigService } from '@nestjs/config';

/* Количество миллисекунд в сутках */
const mSecondsInDay = 24 * 60 * 60 * 1000;

@Injectable()
export class OrderRepositoryMongoDB implements OrderRepository {
  constructor(
    private config: ConfigService,
    @InjectModel('orders') private orderModel: Model<OrderDocument>,
  ) {}

  /**
   * Дата последней зачистки заказов. Если только стартанули,
   * то чистим однозначно, если сервер работает стопятьсот дней,
   * то чистим раз в сутки!
   */
  private lastDataClearOrder: Date = null;

  /** Сохранить заказ для потомков
   *  ... и налоговой
   * @param order - заказ
   * @return id - id заказа
   */
  async saveOrder(order: OrderDTO): Promise<string> {
    const orderSave = await this.orderModel.create({
      email: order.email,
      phone: order.phone,
      tickets: order.tickets,
    });

    const daysToDeleteOrders = parseInt(
      this.config.get<string>('DATABASE_DAYS_TO_DELETE_ORDER') || '365',
    );

    /** Дабы база не распухала, удалим всё что позже N дней (см. в .env DATABASE_DAYS_TO_DELETE_ORDER,
     * по умолчанию год)
     * ... но удалять надо раз в сутки, что бы база данных не перенапрягалась
     */
    let diffDays = 1;
    if (this.lastDataClearOrder) {
      diffDays = Math.ceil(
        Math.abs(new Date().getTime() - this.lastDataClearOrder.getTime()) /
          mSecondsInDay,
      );
    }

    if (!this.lastDataClearOrder || diffDays > 0) {
      await this.orderModel.deleteMany({
        date: {
          $lt: new Date(Date.now() - daysToDeleteOrders * mSecondsInDay),
        },
      });
    }

    // Сохранить дату зачистки
    this.lastDataClearOrder = new Date();
    return orderSave.id;
  }
}

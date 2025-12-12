/**
 * Репозиторий для заказа
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument, TOrder } from './order.types';

interface IOrderRepository {
  saveOrder(order: TOrder): Promise<TOrder>;
}

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(@InjectModel('order') private orderModel: Model<OrderDocument>) {}

  /** Сохранить заказ для потомков
   *  ... и налоговой
   * @param order - заказ
   * @return id - заказ
   */
  async saveOrder(order: TOrder): Promise<TOrder> {
    const orderID: TOrder = await this.orderModel.create(order);

    /* Дабы база не распухала, удалим всё что позже N дней */
    /*Order.deleteMany({
      orderDate: {
        $lt: new Date(Date.now() - config.order.dayToDelete * mSecondsInDay),
      },
    });*/

    return orderID;
  }
}

/**
 * Репозиторий для заказа
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './order.types';
import { OrderDTO } from 'src/order/dto/order.dto';

interface IOrderRepository {
  saveOrder(order: OrderDTO): Promise<OrderDTO>;
}

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(@InjectModel('order') private orderModel: Model<OrderDocument>) {}

  /** Сохранить заказ для потомков
   *  ... и налоговой
   * @param order - заказ
   * @return id - заказ
   */
  async saveOrder(order: OrderDTO): Promise<OrderDTO> {
    console.log(order);
    const orderID: OrderDTO = await this.orderModel.create(order);

    /* Дабы база не распухала, удалим всё что позже N дней */
    /*Order.deleteMany({
      orderDate: {
        $lt: new Date(Date.now() - config.order.dayToDelete * mSecondsInDay),
      },
    });*/

    return orderID;
  }
}

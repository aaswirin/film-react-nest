/**
 * Заказ. Сервис
 */

import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films/films.repository';
import { OrderRepository } from '../repository/orders/order.repository';
import { OrderDTO, ResponseOrder, TicketDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmsRepository: FilmsRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  /**
   * Создать заказ
   * @param orderData - собственно заказ
   * @return Object - результат заказа
   */
  async createOrder(orderData: OrderDTO): Promise<ResponseOrder> {
    const ticketsData: TicketDTO[] = orderData.tickets;

    /**
     * Проверка свободных мест
     */
    for (const ticket of ticketsData) {
      const check = await this.filmsRepository.getFreePlace({
        film: ticket.film,
        session: ticket.session,
        place: `${ticket.row}:${ticket.seat}`,
      });

      if (!check) {
        return { message: `Место ${ticket.row}:${ticket.seat} уже занято` };
      }
    }

    const id = await this.orderRepository.saveOrder(orderData);

    const saleData = [];

    /**
     * Продажа билетов
     */
    for (const order of ticketsData) {
      const sale = await this.filmsRepository.salePlace({
        film: order.film,
        session: order.session,
        place: `${order.row}:${order.seat}`,
      });

      if (sale) {
        const data = { ...order, id };
        saleData.push(data);
      }

      if (!sale) {
        return { error: 'Не удалось оформить заказ' };
      }
    }

    /**
     * Продано! Клиент ушёл довольным...
     */
    return {
      total: saleData.length,
      items: saleData,
    };
  }
}

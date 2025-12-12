/**
 * Заказ. Сервис
 */

import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { OrderRepository } from '../repository/order.repository';
import { OrderDTO, TicketDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmsRepository: FilmsRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(orderData: OrderDTO): Promise<any> {
    const ticketsData: TicketDTO[] = orderData.tickets;

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

    const saleData = [];

    for (const order of ticketsData) {
      const sale = await this.filmsRepository.salePlace({
        film: order.film,
        session: order.session,
        place: `${order.row}:${order.seat}`,
      });

      console.log(sale);
      if (sale) {
        const id = await this.orderRepository.saveOrder(orderData);
        console.log(id);
        const data = { ...order, id };
        saleData.push(data);
      }

      if (!sale) {
        return { error: 'Не удалось оформить заказ' };
      }
    }

    return {
      total: saleData.length,
      items: saleData,
    };
  }
}

/**
 * Заказ. Сервис
 */

import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { OrderDTO, TicketDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

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

      if (sale) {
        const id = 3333;
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

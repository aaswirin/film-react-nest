/**
 * Репозиторий для заказа. PostgreSQL
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.types';
import { OrderDTO, TicketDTO } from 'src/order/dto/order.dto';
import { ScheduleEntity } from '../../films/dto/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepositoryPostgreSQL extends OrderRepository {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly schedules: Repository<ScheduleEntity>,
  ) {
    super();
  }

  /** Обработка заказа
   * @param order - заказ
   * @return id - id заказа
   */
  async saveOrder(order: OrderDTO): Promise<string> {
    const id = order.tickets[0].session;
    const schedule = await this.schedules.findOne({
      where: { id },
    });
    if (!schedule) throw NotFoundException;

    const taken = schedule.taken.split(',').filter(Boolean);

    order.tickets.forEach((ticket: TicketDTO) => {
      taken.push(`${ticket.row}:${ticket.seat}`);
    });

    await this.schedules.update({ id }, { taken: taken.join(',') });

    return schedule.id;
  }
}

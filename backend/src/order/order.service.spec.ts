/**
 * Заказ. Сервис. Тесты
 */

import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsService } from '../films/films.service';
import { FilmsRepository } from '../repository/films/films.types';
import { OrderRepository } from '../repository/orders/order.types';

describe('OrderService', () => {
  let service: OrderService;
  class FilmsRepositoryMock {}
  class OrderRepositoryMock {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository.TOKEN,
          useClass: OrderRepositoryMock,
        },
        FilmsService,
        {
          provide: FilmsRepository.TOKEN,
          useClass: FilmsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

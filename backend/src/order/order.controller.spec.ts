/**
 * Заказ. Контроллер. Тесты
 */

import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from '../repository/orders/order.types';
import { FilmsService } from '../films/films.service';
import { FilmsRepository } from '../repository/films/films.types';

describe('OrderController', () => {
  let controller: OrderController;
  class FilmsRepositoryMock {}
  class OrderRepositoryMock {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
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

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

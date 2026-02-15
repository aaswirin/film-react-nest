/**
 * Фильмы. Контроллер. Тесты
 */

import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films/films.types';

describe('FilmsController', () => {
  let controller: FilmsController;
  class FilmsRepositoryMock {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        {
          provide: FilmsRepository.TOKEN,
          useClass: FilmsRepositoryMock,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

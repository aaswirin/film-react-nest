/**
 * Фильмы. Сервис. Тесты
 */

import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films/films.types';

describe('FilmsService', () => {
  let service: FilmsService;
  class FilmsRepositoryMock {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsRepository.TOKEN,
          useClass: FilmsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

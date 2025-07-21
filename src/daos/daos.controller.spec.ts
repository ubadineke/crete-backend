import { Test, TestingModule } from '@nestjs/testing';
import { DaosController } from './daos.controller';
import { DaosService } from './daos.service';

describe('DaosController', () => {
  let controller: DaosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaosController],
      providers: [DaosService],
    }).compile();

    controller = module.get<DaosController>(DaosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

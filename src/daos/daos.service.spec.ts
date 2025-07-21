import { Test, TestingModule } from '@nestjs/testing';
import { DaosService } from './daos.service';

describe('DaosService', () => {
  let service: DaosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaosService],
    }).compile();

    service = module.get<DaosService>(DaosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

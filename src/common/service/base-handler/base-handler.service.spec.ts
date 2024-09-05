import { Test, TestingModule } from '@nestjs/testing';
import { BaseHandlerService } from './base-handler.service';

describe('BaseHandlerService', () => {
  let service: BaseHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseHandlerService],
    }).compile();

    service = module.get<BaseHandlerService>(BaseHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

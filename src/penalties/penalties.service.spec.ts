import { Test, TestingModule } from '@nestjs/testing';
import { PenaltiesService } from './penalties.service';
import { PrismaService } from '../prisma/prisma/prisma.service';

describe('PenaltiesService', () => {
  let service: PenaltiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PenaltiesService,PrismaService],
    }).compile();

    service = module.get<PenaltiesService>(PenaltiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

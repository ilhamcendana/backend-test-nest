import { Test, TestingModule } from '@nestjs/testing';
import { BorrowService } from './borrow.service';
import { BooksService } from '../books/books.service';
import { PenaltiesService } from '../penalties/penalties.service';
import { PrismaService } from '../prisma/prisma/prisma.service';

describe('BorrowService', () => {
  let service: BorrowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowService, BooksService, PenaltiesService,PrismaService],
    }).compile();

    service = module.get<BorrowService>(BorrowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

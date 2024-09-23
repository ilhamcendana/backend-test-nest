import { Test, TestingModule } from '@nestjs/testing';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { BooksService } from '../books/books.service';
import { PenaltiesService } from '../penalties/penalties.service';

describe('BorrowController', () => {
  let controller: BorrowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowController],
      providers: [BorrowService,PrismaService,BooksService,PenaltiesService]
    }).compile();

    controller = module.get<BorrowController>(BorrowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

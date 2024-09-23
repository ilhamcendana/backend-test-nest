import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { BooksService } from '../books/books.service';
import { PenaltiesService } from '../penalties/penalties.service';

@Module({
  controllers: [BorrowController],
  providers: [BorrowService, BooksService, PenaltiesService],
})
export class BorrowModule {}

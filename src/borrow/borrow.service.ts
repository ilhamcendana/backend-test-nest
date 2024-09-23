import { BadRequestException, Injectable } from '@nestjs/common';
import { Borrow } from '@prisma/client';
import * as dayjs from 'dayjs';
import { BooksService } from '../books/books.service';
import { PenaltiesService } from '../penalties/penalties.service';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class BorrowService {
  constructor(
    private prismaService: PrismaService,
    private bookService: BooksService,
    private penaltyService: PenaltiesService,
  ) {}

  async createBorrowBook(memberId: number, bookId: number): Promise<Borrow> {
    // Check member's current borrows
    const currentBorrows = await this.prismaService.borrow.count({
      where: {
        memberId,
        returnDate: null,
      },
    });

    if (currentBorrows >= 2)
      throw new BadRequestException('This member already borrows 2 books');

    // Check member's penalty status
    const currentPenalty = await this.penaltyService.getPenaltyCountFromMember(
      memberId,
    );
    if (currentPenalty > 0)
      throw new BadRequestException('This member is being penalized');

    // Check book stock availability
    const getBook = await this.bookService.getOneBook(bookId);

    if (!getBook || getBook.stock < 1)
      throw new BadRequestException('Book is not available');

    // Create new borrow data
    const borrowedBook = await this.prismaService.borrow.create({
      data: {
        memberId,
        bookId,
        borrowDate: dayjs().format(),
      },
    });

    // // Decrease Book stock
    await this.bookService.updateStock(bookId, 'decrement');

    // // RETURN
    return borrowedBook;
  }

  async returningBook(borrowId: number) {
    // Check if the user actually have the book being borrowed
    const getBorrow = await this.prismaService.borrow.findUnique({
      where: {
        id: borrowId,
      },
    });

    if (!getBorrow)
      throw new BadRequestException('Member or Book is not found');
    if (getBorrow.returnDate !== null)
      throw new BadRequestException('Book is already returned');

    // Check if the borrow's date is over 7 days and Give a penalty for 3 days
    const isPenalized = dayjs().isBefore(
      dayjs(getBorrow.borrowDate).set('day', 7),
    );
    if (isPenalized) {
      await this.penaltyService.createPenalty(getBorrow.memberId);
    }

    // Update borrow's returnDate
    await this.prismaService.borrow.update({
      where: {
        id: borrowId,
      },
      data: {
        returnDate: dayjs().format(),
      },
    });

    // Increase book availability
    await this.bookService.updateStock(getBorrow.bookId, 'increment');

    // RETURN
    const msg = {
      nonPenalty: 'Book is successfuly returned',
      penalty: `Book is successfuly returned, but you're getting penalized because the delay of returning the book`,
    };
    return !isPenalized ? msg.nonPenalty : msg.penalty;
  }
}

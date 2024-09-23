import { Body, Controller, Post } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { Borrow } from '@prisma/client';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BorrowDto, CreateBorrow, ReturnBorrow } from '../../dto/borrow.dto';

@ApiTags('Borrow')
@Controller('/api/borrow')
export class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Post('/create')
  @ApiBody({
    description:
      'You need to provide id of the member and the book to create a new borrow.',
    type: CreateBorrow,
  })
  @ApiOkResponse({
    description: 'Response after successfully borrowing a book',
    type: BorrowDto,
  })
  async borrow(
    @Body('memberId') memberId: number,
    @Body('bookId') bookId: number,
  ): Promise<Borrow> {
    return this.borrowService.createBorrowBook(memberId, bookId);
  }

  @Post('/return')
  @ApiBody({
    description: 'You need to provide borrowId when you returning the book.',
    type: ReturnBorrow,
  })
  @ApiOkResponse({
    description:
      'Response after successfully returning a book and if the member get penalized',
    example:
      "Book is successfuly returned || Book is successfuly returned, but you're getting penalized because the delay of returning the book",
  })
  async returnBook(@Body('borrowId') borrowId: number): Promise<string> {
    return this.borrowService.returningBook(borrowId);
  }
}

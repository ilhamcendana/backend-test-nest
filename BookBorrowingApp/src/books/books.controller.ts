import { Body, Controller, Get, HttpException, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '@prisma/client';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookDto } from '../../dto/book.dto';

@ApiTags("Books")
@Controller('/api/books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  @ApiOkResponse({
    description:'List of books successfully retrieved',
    type: [BookDto]
  })
  async listBooks(@Body("availableOnly") availableOnly: boolean): Promise<Book[]> {
    return this.bookService.getAllBooks(availableOnly);
  }

  @Get(':id')
  @ApiOkResponse({
    description:'Specific book successfully retrieved',
    type: BookDto
  })
  async getBook(@Param('id') bookId: number): Promise<Book> {
    const book = await this.bookService.getOneBook(bookId);
    if (!book) {
      throw new HttpException(
        {
          code: 404,
          errors: {
            message: 'Book not found',
          },
        },
        404,
      );
    }

    return book;
  }
}

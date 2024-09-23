import { ApiProperty } from '@nestjs/swagger';

export class BorrowDto {
  @ApiProperty({ example: 12 })
  id: number;

  @ApiProperty({ example: 1 })
  memberId: number;

  @ApiProperty({ example: 3 })
  bookId: number;

  @ApiProperty({ example: 'Mon Sep 23 2024 08:43:10 GMT+0700 (Western Indonesia Time)' })
  borrowDate: Date;

  @ApiProperty({ example: null })
  returnDate: Date;
}

export class CreateBorrow {
  @ApiProperty({ example: 1 })
  memberId: number;

  @ApiProperty({ example: 3 })
  bookId: number;
}

export class ReturnBorrow {
  @ApiProperty({ example: 1 })
  borrowId: number;
}
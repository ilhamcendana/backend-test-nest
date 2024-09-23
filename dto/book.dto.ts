import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({ example: 'JK-45' })
  code: string;

  @ApiProperty({ example: 'Harry Potter' })
  title: string;

  @ApiProperty({ example: 'J.K Rowling' })
  author: string;

  @ApiProperty({ example: 1 })
  stock: number;
}

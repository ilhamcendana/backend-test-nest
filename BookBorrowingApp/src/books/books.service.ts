import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  async getAllBooks(availableOnly?: boolean) {
    return await this.prismaService.book.findMany({
      where: {
        stock: {
          ...(availableOnly ? { gt: 0 } : undefined),
        },
      },
    });
  }

  async getOneBook(id: number) {
    return await this.prismaService.book.findUnique({
      where: {
        id,
      },
    });
  }

  async updateStock(id: number, mode: 'increment' | 'decrement') {
    return await this.prismaService.book.update({
      where: {
        id,
      },
      data: {
        stock: {
          ...(mode === 'increment'
            ? { ['increment']: 1 }
            : mode === 'decrement'
            ? { ['decrement']: 1 }
            : undefined),
        },
      },
    });
  }
}

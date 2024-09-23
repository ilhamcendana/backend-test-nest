import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prismaService: PrismaService) {}

  async listAllMembers(): Promise<Member[]> {
    return await this.prismaService.member.findMany({
      include: {
        borrowedBooks: true,
        penalties: true,
      },
    });
  }

  async getMember(id: number): Promise<Member> {
    return await this.prismaService.member.findUnique({
      where: {
        id,
      },
      include: {
        borrowedBooks: true,
        penalties: true,
      },
    });
  }
}

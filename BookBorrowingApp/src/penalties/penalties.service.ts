import { Injectable } from '@nestjs/common';
import { Penalty } from '@prisma/client';
import * as dayjs from 'dayjs';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class PenaltiesService {
  constructor(private prismaService: PrismaService) {}

  async createPenalty(memberId: number): Promise<Penalty> {
    return await this.prismaService.penalty.create({
      data: {
        memberId,
        startDate: dayjs().format(),
        endDate: dayjs().set('day', 3).format(),
      },
    });
  }

  async getPenaltyCountFromMember(memberId: number): Promise<number> {
    return await this.prismaService.penalty.count({
      where: {
        memberId,
        endDate: {
          gte: dayjs().format(),
        },
      },
    });
  }
}

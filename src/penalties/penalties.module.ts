import { Module } from '@nestjs/common';
import { PenaltiesService } from './penalties.service';

@Module({
  providers: [PenaltiesService]
})
export class PenaltiesModule {}

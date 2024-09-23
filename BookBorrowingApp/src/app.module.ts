import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ValidationModule } from './validation/validation.module';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { BorrowModule } from './borrow/borrow.module';
import { PenaltiesModule } from './penalties/penalties.module';

@Module({
  imports: [    
    PrismaModule,
    ValidationModule.forRoot(true),
    BooksModule,
    MembersModule,
    BorrowModule,
    PenaltiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { BoardRepository } from './board.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './../typeorm-ex/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    // TypeOrmModule.forFeature([Board]),
  ],

  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}

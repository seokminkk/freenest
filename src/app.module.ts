import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmExModule } from './typeorm-ex/typeorm-ex.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Board } from './boards/board.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User, Board]),
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
    // TypeOrmExModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmExModule } from './typeorm-ex/typeorm-ex.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Board } from './boards/board.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User, Board]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
    // TypeOrmExModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}

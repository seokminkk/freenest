import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.model';

// @CustomRepository(Board)
// @Injectable()
// export class BoardRepository {
//   constructor(
//     @InjectRepository(Board)
//     private readonly boardRepository: Repository<Board>,
//   ) {}
// }
@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}

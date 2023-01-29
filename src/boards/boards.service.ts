import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards() {
    return await this.boardRepository.find();
  }
  createBoard(createBoardDto: CreateBoardDto, user: User) {
    // const { title, description } = createBoardDto;
    // const board = this.boardRepository.create({
    //   title,
    //   description,
    //   status: BoardStatus.PUBLIC,
    // });
    // await this.boardRepository.save(board);
    // return board
    //위에주석부분은 리포지토리에서 처리해야함 확인차 여기서해본거

    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardMadenId(user: User) {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  async getBoardById(id: number) {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`${id} 는 없는아이디입니당 `);
    }
    return found;
  }

  async deleteBoard(id: number, user: User) {
    const result = await this.boardRepository
      .createQueryBuilder('board')

      .delete()

      .from(Board)

      .where('userId = :userId', { userId: user.id })

      .andWhere('id = :id', { id: id })

      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`${id} 는 없는아이디인디영`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  //db하기전 nest로컬메모리로 테스트한거
  // private boards: Array<Board> = [];
  // getAllBoards() {
  //   return this.boards;
  // }
  // createBoard(
  //   // title: string, description: string
  //   createBoardDto: CreateBoardDto, //디티오적용
  // ) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  // getBoardById(id: string) {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`${id} 는 없는아이디입니당 `);
  //   }
  //   return found;
  // }
  // deleteBoard(id: string) {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus) {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}

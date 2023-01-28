import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto) {
    // const { title, description } = createBoardDto;
    // const board = this.boardRepository.create({
    //   title,
    //   description,
    //   status: BoardStatus.PUBLIC,
    // });
    // await this.boardRepository.save(board);
    // return board
    //위에주석부분은 리포지토리에서 처리해야함 확인차 여기서해본거

    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number) {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`${id} 는 없는아이디입니당 `);
    }
    return found;
  }

  async deleteBoard(id: number) {
    const result = await this.boardRepository.delete(id);
    console.log('result', result);
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

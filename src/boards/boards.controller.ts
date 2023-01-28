import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number) {}
  //db연결전 nest 로컬메모리로 테스트한거
  // @Get('/')
  // getAllBoard() {
  //   return this.boardsService.getAllBoards();
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(
  //   // @Body('title') title: string,
  //   // @Body('description') description: string,
  //   @Body() createBoardDto: CreateBoardDto, //디티오를 이용함
  // ) {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  // //localhost:5000?id=sfsfsfsf&title=wrwrw
  // //id 하나만 가져오고 싶으면 @Param('id') id: string 이런식으로하는거고
  // //쿼리모두가져오고싶다하면 @Param() params: Array<string> 이런식으로하면된다
  // @Get('/:id')
  // getBoardById(@Param('id') id: string) {
  //   return this.boardsService.getBoardById(id);
  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string) {
  //   return this.boardsService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}

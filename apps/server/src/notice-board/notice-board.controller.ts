import { Body, Controller, Post } from '@nestjs/common';

import type { CreateNoticeDto } from './notice-board.service';
import { NoticeBoardService } from './notice-board.service';

@Controller('notice-board')
export class NoticeBoardController {
  constructor(
    private readonly noticeBoardService: NoticeBoardService,
  ) {}

  @Post()
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticeBoardService.create(createNoticeDto);
  }
}

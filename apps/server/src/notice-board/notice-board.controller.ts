import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import type { CreateNoticeDto } from './notice-board.service';
import { NoticeBoardService } from './notice-board.service';

@Controller('notice-board')
export class NoticeBoardController {
  constructor(
    private readonly noticeBoardService: NoticeBoardService,
  ) {}

  @Get()
  findAll(
    @Query('pageSize') pageSize?: number,
    @Query('lastCreatedAt') lastCreatedAt?: string,
  ) {
    return this.noticeBoardService.findAll(
      pageSize ? Number(pageSize) : undefined,
      lastCreatedAt,
    );
  }

  @Post()
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticeBoardService.create(createNoticeDto);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticeBoardService.create(createNoticeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeBoardService.findOne(id);
  }
}

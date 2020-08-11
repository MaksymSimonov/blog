import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from '@post/comment/comment.service';
import { CommentListDto } from '../dto/comment.list.dto';
import { CommentDto } from '../dto/comment.dto';
import { CreateCommentDto } from '@post/dto/comment.create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':id')
  async findOneComment(@Param('id') id: string): Promise<CommentDto> {
    return await this.commentService.getComment(id);
  }

  @Get('post/:id')
  async findCommentsByPost(@Param('id') id: string): Promise<CommentListDto> {
    const comments = await this.commentService.getCommentsByPost(id);
    return { comments };
  }

  @Post('post/:id')
  @UseGuards(AuthGuard())
  async create(
    @Param('id') post: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDto> {
    return await this.commentService.createComment(post, createCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async destory(@Param('id') id: string): Promise<CommentDto> {
    return await this.commentService.destoryComment(id);
  }
}

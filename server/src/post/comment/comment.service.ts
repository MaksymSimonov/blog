import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from '../dto/comment.create.dto';
import { CommentDto } from '../dto/comment.dto';
import { CommentEntity } from '@post/entity/comment.entity';
import { toCommentDto } from '@shared/mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '@post/entity/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
  ) {}

  async getComment(id: string): Promise<CommentDto> {
    const comment: CommentEntity = await this.commentRepo.findOne({ where: { id } });

    if (!comment) {
      throw new HttpException(`Comment doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toCommentDto(comment);
  }

  async getCommentsByPost(id: string): Promise<CommentDto[]> {
    const comments: CommentEntity[] = await this.commentRepo.find({
      where: { post: { id } },
      relations: ['post'],
    });

    return comments.map(comment => toCommentDto(comment));
  }

  async createComment(postId: string, commentDto: CreateCommentDto): Promise<CommentDto> {
    const { name } = commentDto;

    const post: PostEntity = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['comments', 'owner'],
    });

    const comment: CommentEntity = await this.commentRepo.create({
      name,
      post,
    });

    await this.commentRepo.save(comment);

    return toCommentDto(comment);
  }

  async destoryComment(id: string): Promise<CommentDto> {
    const comment: CommentEntity = await this.commentRepo.findOne({ where: { id } });

    if (!comment) {
      throw new HttpException(`Comment doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.commentRepo.delete({ id });

    return toCommentDto(comment);
  }
}

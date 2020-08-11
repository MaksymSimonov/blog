import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { PostEntity } from '@post/entity/post.entity';
import { PostDto } from './dto/post.dto';
import { toPostDto } from '@shared/mapper';
import { CreatePostDto } from './dto/post.create.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '@user/dto/user.dto';
import { UserService } from '@user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    private readonly userService: UserService,
  ) {}

  async getAllPosts(): Promise<PostDto[]> {
    const posts = await this.postRepo.find({ relations: ['comments', 'owner'] });
    return posts.map(post => toPostDto(post));
  }

  async getOnePost(id: string): Promise<PostDto> {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['comments', 'owner'],
    });

    if (!post) {
      throw new HttpException(
        `Post doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPostDto(post);
  }

  async createPost(
    { username }: UserDto,
    createPostDto: CreatePostDto,
  ): Promise<PostDto> {
    const { name, description } = createPostDto;

    // get the user from db
    const owner = await this.userService.findOne({ where: { username } });

    const post: PostEntity = await this.postRepo.create({
      name,
      description,
      owner,
    });

    await this.postRepo.save(post);

    return toPostDto(post);
  }

  async updatePost(id: string, postDto: PostDto): Promise<PostDto> {
    const { name, description } = postDto;

    let post: PostEntity = await this.postRepo.findOne({ where: { id } });

    if (!post) {
      throw new HttpException(
        `Post doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    post = {
      id,
      name,
      description,
    };

    await this.postRepo.update({ id }, post); // update

    post = await this.postRepo.findOne({
      where: { id },
      relations: ['comments', 'owner'],
    }); // re-query

    return toPostDto(post);
  }

  async destoryPost(id: string): Promise<PostDto> {
    const post: PostEntity = await this.postRepo.findOne({
      where: { id },
      relations: ['comments', 'owner'],
    });

    if (!post) {
      throw new HttpException(
        `Post doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.postRepo.delete({ id }); // delete todo list

    return toPostDto(post);
  }
}

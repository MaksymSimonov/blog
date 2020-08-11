import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostListDto } from './dto/post.list.dto';
import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/post.create.dto';
import { PostService } from '@post/post.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@user/dto/user.dto';

@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Req() req: any): Promise<PostListDto> {
    const posts = await this.postService.getAllPosts();
    return { posts };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostDto> {
    return await this.postService.getOnePost(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: any,
  ): Promise<PostDto> {
    const user = req.user as UserDto;

    return await this.postService.createPost(user, createPostDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() postDto: PostDto,
  ): Promise<PostDto> {
    return await this.postService.updatePost(id, postDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async destory(@Param('id') id: string): Promise<PostDto> {
    return await this.postService.destoryPost(id);
  }
}

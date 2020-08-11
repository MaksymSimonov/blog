import { CommentDto } from './comment.dto';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from '@user/dto/user.dto';

export class PostDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  createdOn?: Date;
  description?: string;

  owner: UserDto;

  comments?: CommentDto[];
}

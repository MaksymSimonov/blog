import { CommentDto } from '@post/dto/comment.dto';
import { PostEntity } from '@post/entity/post.entity';
import { PostDto } from '@post/dto/post.dto';
import { CommentEntity } from '@post/entity/comment.entity';
import { UserEntity } from '@user/entity/user.entity';
import { UserDto } from '@user/dto/user.dto';

export const toPostDto = (data: PostEntity): PostDto => {
  const { id, name, description, comments, owner } = data;

  let postDto: PostDto = {
    id,
    name,
    description,
    owner: owner ? toUserDto(owner) : null,
  };

  if (comments) {
    postDto = {
      ...postDto,
      comments: comments.map((comment: CommentEntity) => toCommentDto(comment)),
    };
  }

  return postDto;
};

export const toCommentDto = (data: CommentEntity): CommentDto => {
  const { id, name } = data;

  let commentDto: CommentDto = {
    id,
    name,
  };

  return commentDto;
};

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;

  let userDto: UserDto = {
    id,
    username,
    email,
  };

  return userDto;
};

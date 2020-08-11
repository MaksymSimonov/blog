import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { PostEntity } from '@post/entity/post.entity';
import { CommentEntity } from '@post/entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@user/entity/user.entity';
import { UserModule } from '@user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([PostEntity, CommentEntity, UserEntity]),
  ],
  controllers: [PostController, CommentController],
  providers: [PostService, CommentService],
})
export class PostModule {}

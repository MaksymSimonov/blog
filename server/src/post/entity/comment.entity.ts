import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { PostEntity } from '@post/entity/post.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @CreateDateColumn() createdOn?: Date;

  @ManyToOne(type => PostEntity, post => post.comments)
  post?: PostEntity;
}

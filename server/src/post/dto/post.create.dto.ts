import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { UserDto } from '@user/dto/user.dto';

export class CreatePostDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;
}

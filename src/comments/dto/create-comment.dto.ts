import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  boardId: number;

  @IsNotEmpty()
  commenter: string;

  @IsNotEmpty()
  img: string;

  @IsNotEmpty()
  u_id: number;
}

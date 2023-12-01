// src/presentation/dtos/comment-request.dto.ts

import {  IsNotEmpty, IsString, } from "class-validator";
import { IComment, emptyComment } from "../../domain/models/comment";
import { nanoid } from "nanoid";

export class CommentRequestDto {

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  postId: string;

  // @IsNotEmpty()
  // @IsString()
  parent_id?: string;


  constructor(data: IComment) {
    this.content = data.content;
    this.postId = data.postId;
    this.parent_id = data.parent_id;
  }

  toData(): IComment {
    return {
      ...emptyComment,
      id: nanoid(10),
      content: this.content,
      postId: this.postId,
      parent_id: this.parent_id
    };
  }

  toUpdateData(data: IComment): IComment {
    return {
      id: data.id,
      content: data.content,
      userId: data.userId,
      postId: data.postId,
      parent_id: data.parent_id,
      publishedAt: data.publishedAt,
    }
  }
}

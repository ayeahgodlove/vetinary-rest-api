// src/presentation/dtos/post-request.dto.ts

import {  IsNotEmpty, IsString, Length } from "class-validator";
import { IPost, emptyPost } from "../../domain/models/post";
import slugify from "slugify";
import { nanoid } from "nanoid";

export class PostRequestDto {
  @IsNotEmpty()
  @IsString()
  // @Length(10, 128)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  constructor(data: IPost) {
    this.title = data.title;
    this.content = data.content;
    // this.imageUrl = data.imageUrl;
    this.categoryId = data.categoryId;
  }

  toData(): IPost {
    return {
      ...emptyPost,
      id: nanoid(10),
      slug:  slugify(this.title, {lower: true, replacement: "-"}),
      title: this.title,
      content: this.content,
      categoryId: this.categoryId,
      // imageUrl: this.imageUrl, 
    };
  }

  toUpdateData(data: IPost): IPost {
    return {
      id: data.id,
      title: data.title,
      authorId: data.authorId,
      categoryId: data.categoryId,
      content: data.content,
      imageUrl: data.imageUrl,
      publishedAt: data.publishedAt,
      slug: data.slug,
    }
  }
}

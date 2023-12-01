// src/presentation/dtos/document-request.dto.ts

import {  IsNotEmpty, IsString, Length } from "class-validator";
import { IDocument, emptyDocument } from "../../domain/models/document";
import slugify from "slugify";
import { nanoid } from "nanoid";


export class DocumentRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 128)
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  // @IsNotEmpty()
  // @IsString()
  // fileUrl: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  constructor(data: IDocument) {
    this.title = data.title;
    this.description = data.description;
    // this.fileUrl = data.fileUrl;
    this.categoryId = data.categoryId;
  }

  toData(): IDocument {
    return {
      ...emptyDocument,
      id: nanoid(10),
      slug:  slugify(this.title, {lower: true, replacement: "-"}),
      title: this.title,
      description: this.description,
      categoryId: this.categoryId,
      // fileUrl: this.fileUrl, 
    };
  }

  toUpdateData(data: IDocument): IDocument {
    return {
      id: data.id,
      title: data.title,
      userId: data.userId,
      categoryId: data.categoryId,
      description: data.description,
      fileUrl: data.fileUrl,
      uploadDate: data.uploadDate,
      slug: data.slug,
    }
  }
}

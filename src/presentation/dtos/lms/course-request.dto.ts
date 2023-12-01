// src/presentation/dtos/course-request.dto.ts

import {  IsNotEmpty, IsString } from "class-validator";
import { nanoid } from "nanoid";
import { ICourse, emptyCourse } from "../../../domain/models/lms/course";

export class CourseRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;

  constructor(data: ICourse) {
    this.title = data.title;
    this.description = data.description;
    this.authorId = data.authorId
  }

  toData(): ICourse {
    return {
      ...emptyCourse,
      id: nanoid(10),
      title: this.title,
      description: this.description,
      authorId: this.authorId
    };
  }

  toUpdateData(data: ICourse): ICourse {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      authorId: data.authorId,
      courseImage: data.courseImage
    }
  }
}

// src/presentation/dtos/course-request.dto.ts

import { IsNotEmpty, IsNumber, IsString } from "class-validator";
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

  @IsNotEmpty()
  // @IsNumber()
  price: number;

  constructor(data: ICourse) {
    this.title = data.title;
    this.description = data.description;
    this.authorId = data.authorId;
    this.price = data.price;
  }

  toData(): ICourse {
    return {
      ...emptyCourse,
      id: nanoid(10),
      title: this.title,
      description: this.description,
      authorId: this.authorId,
      price: Number(this.price),
    };
  }

  toUpdateData(data: ICourse): ICourse {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      authorId: data.authorId,
      courseImage: data.courseImage,
      price:  Number(data.price),
      completionDate: data.completionDate,
      startDate: data.startDate
    };
  }
}

// src/presentation/dtos/review-request.dto.ts

import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ILessonReview, emptyLessonReview } from "../../domain/models/lesson-review";
import { nanoid } from "nanoid";

export class LessonReviewRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  constructor(data: ILessonReview) {
    this.userId = data.userId;
    this.rating = data.rating;
    this.comment = data.comment;
  }

  toData(): ILessonReview {
    return {
      ...emptyLessonReview,
      id: nanoid(10),
      comment: this.comment,
      rating: this.rating,
      userId: this.userId,
    };
  }

  toUpdateData(data: ILessonReview): ILessonReview {
    return {
      id: data.id,
      comment: data.comment,
      rating: data.rating,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

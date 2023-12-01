// src/presentation/dtos/productReview-request.dto.ts

import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IProductReview, emptyProductReview } from "../../domain/models/product-review";
import { nanoid } from "nanoid";

export class ProductReviewRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  constructor(data: IProductReview) {
    this.userId = data.userId;
    this.rating = data.rating;
    this.comment = data.comment;
  }

  toData(): IProductReview {
    return {
      ...emptyProductReview,
      id: nanoid(10),
      comment: this.comment,
      rating: this.rating,
      userId: this.userId,
    };
  }

  toUpdateData(data: IProductReview): IProductReview {
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

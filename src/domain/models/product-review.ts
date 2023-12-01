import { IBaseResponse } from "./base-response";

export interface IProductReview {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export const emptyProductReview: IProductReview = {
  id: "",
  userId: "",
  rating: 0,
  comment: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface IProductReviewResponse extends IBaseResponse {
  data: IProductReview | null | IProductReview[];
}

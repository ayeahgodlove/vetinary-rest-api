import { IBaseResponse } from "./base-response";

export interface ILessonReview {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export const emptyLessonReview: ILessonReview = {
  id: "",
  userId: "",
  rating: 0,
  comment: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface ILessonReviewResponse extends IBaseResponse {
  data: ILessonReview | null | ILessonReview[];
}

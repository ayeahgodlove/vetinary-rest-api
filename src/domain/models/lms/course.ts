import { IBaseResponse } from "../base-response";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  courseImage: string;
  authorId: string
  price: number,
}

export const emptyCourse: ICourse = {
  id: "",
  title: "",
  description: "",
  courseImage: "",
  authorId: "",
  price: 0
};

export interface ICourseResponse extends IBaseResponse {
  data: ICourse | null | ICourse[];
}

import { IBaseResponse } from "../base-response";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  courseImage: string;
  authorId: string
  price: number,
  enrollmentDate: Date;
  completionDate: Date;
}

export const emptyCourse: ICourse = {
  id: "",
  title: "",
  description: "",
  courseImage: "",
  authorId: "",
  price: 0,
  enrollmentDate: new Date(),
  completionDate: new Date()
};

export interface ICourseResponse extends IBaseResponse {
  data: ICourse | null | ICourse[];
}

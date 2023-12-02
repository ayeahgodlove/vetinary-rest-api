import { IBaseResponse } from "../base-response";

export interface ILesson {
  id: string;
  title: string;
  description: string;
  authorId: string;
  content: string;
  duration: number;
  difficulty: string;
  author: string;
  courseId: string;
  // dependencies
  prerequisites: string[];
  objectives: string[];
  keywords: string[];

   // Additional properties
   category?: string;
   language?: string;
   targetAudience?: string;
   rating?: number;
   reviews?: string[];
}

export const emptyLesson: ILesson = {
  id: "",
  title: "",
  description: "",
  authorId: "",
  content: "",
  duration: 0,
  difficulty: "",
  prerequisites: [],
  objectives: [],
  keywords: [],
  author: "",
  courseId: ""
};

export interface ILessonResponse extends IBaseResponse {
  data: ILesson | null | ILesson[];
}

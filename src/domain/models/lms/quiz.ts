import { IBaseResponse } from "../base-response";

// {
//   question: "What is JavaScript?",
//   answers: ["A programming language", "A web browser", "A markup language"],
//   correctAnswerIndex: 0,
// }

export interface IQuiz {
  id: string;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  lessonId: string;
}

export const emptyQuiz: IQuiz = {
  id: "",
  question: "",
  answers: [""],
  correctAnswerIndex: 0,
  lessonId: ""
};

export interface IQuizResponse extends IBaseResponse {
  data: IQuiz | null | IQuiz[];
}

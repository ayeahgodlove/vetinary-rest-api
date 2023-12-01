// src/presentation/dtos/quiz-request.dto.ts

import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { nanoid } from "nanoid";
import { IQuiz, emptyQuiz } from "../../../domain/models/lms/quiz";

export class QuizRequestDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsArray()
  answers: string[];

  @IsNotEmpty()
  @IsNumber()
  correctAnswerIndex: number;

  constructor(data: IQuiz) {
    this.question = data.question;
    this.answers = data.answers;
    this.correctAnswerIndex = data.correctAnswerIndex;
  }

  toData(): IQuiz {
    return {
      ...emptyQuiz,
      id: nanoid(10),
      question: this.question,
      answers: this.answers,
      correctAnswerIndex: this.correctAnswerIndex,
    };
  }

  toUpdateData(data: IQuiz): IQuiz {
    return {
      id: data.id,
      question: data.question,
      answers: data.answers,
      correctAnswerIndex: data.correctAnswerIndex,
    };
  }
}

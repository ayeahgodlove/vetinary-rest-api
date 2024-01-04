// src/presentation/dtos/lesson-request.dto.ts

import { IsNotEmpty, IsNumber, IsString, IsArray } from "class-validator";
import { nanoid } from "nanoid";
import { ILesson, emptyLesson } from "../../../domain/models/lms/lesson";

export class LessonRequestDto {
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
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsString()
  difficulty: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsArray()
  prerequisites: string[];

  @IsNotEmpty()
  @IsArray()
  objectives: string[];

  @IsNotEmpty()
  @IsArray()
  keywords: string[];

  @IsNotEmpty()
  @IsString()
  courseId: string;

  constructor(data: ILesson) {
    this.title = data.title;
    this.description = data.description;
    this.authorId = data.authorId;
    this.content = data.content;
    this.duration = data.duration;
    this.difficulty = data.difficulty;
    this.prerequisites = data.prerequisites;
    this.objectives = data.objectives;
    this.keywords = data.keywords;
    this.author = data.author;
    this.courseId = data.courseId;
  }

  toData(): ILesson {
    return {
      ...emptyLesson,
      id: nanoid(10),
      title: this.title,
      description: this.description,
      authorId: this.authorId,
      content: this.content,
      difficulty: this.difficulty,
      duration: this.duration,
      prerequisites: this.prerequisites,
      objectives: this.objectives,
      keywords: this.keywords,
      author: this.author,
      courseId: this.courseId
    };
  }

  toUpdateData(data: ILesson): ILesson {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      authorId: data.authorId,
      content: data.content,
      duration: data.duration,
      prerequisites: data.prerequisites,
      objectives: data.objectives,
      keywords: data.keywords,
      difficulty: data.difficulty,
      author: data.author,
      courseId: data.courseId
    };
  }
}

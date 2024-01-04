import { Request, Response } from "express";
import { QuizRepository } from "../../../data/repositories/impl/lms/quiz.repository";
import { QuizUseCase } from "../../../domain/usecases/lms/quiz.usecase";
import { QuizMapper } from "../../mappers/mapper";
import { QuizRequestDto } from "../../dtos/lms/quiz-request.dto";
import { displayValidationErrors } from "../../../utils/displayValidationErrors";
import {
  IQuiz,
  IQuizResponse,
  emptyQuiz,
} from "../../../domain/models/lms/quiz";
import { validate } from "class-validator";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

const quizRepository = new QuizRepository();
const quizUseCase = new QuizUseCase(quizRepository);
const quizMapper = new QuizMapper();

export class QuizesController {
  async createQuiz(req: Request, res: Response<IQuizResponse>): Promise<void> {
    const dto = new QuizRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const quizResponse = await quizUseCase.createQuiz({
          ...dto.toData(),
        });

        res.status(201).json({
          data: quizResponse.toJSON<IQuiz>(),
          message: "Quiz created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  }

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const quizes = await quizUseCase.getAll();
      const quizesDTO = quizMapper.toDTOs(quizes);

      res.json({
        data: quizesDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getQuizById(req: Request, res: Response<IQuizResponse>): Promise<void> {
    try {
      const id = req.params.id;

      const quiz = await quizUseCase.getQuizById(id);
      if (!quiz) {
        throw new NotFoundException("Quiz", id);
      }
      const quizDTO = quizMapper.toDTO(quiz);
      res.json({
        data: quizDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateQuiz(req: Request, res: Response<IQuizResponse>): Promise<void> {
    const dto = new QuizRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const id = req.params.id;

        const obj: IQuiz = {
          ...emptyQuiz,
          ...req.body,
          id: id,
        };
        const updatedQuiz = await quizUseCase.updateQuiz(obj);
        const quizDto = quizMapper.toDTO(updatedQuiz);

        res.json({
          data: quizDto,
          message: "Quiz Updated Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteQuiz(req: Request, res: Response<IQuizResponse>): Promise<void> {
    try {
      const id = req.params.id;

      await quizUseCase.deleteQuiz(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      });
    }
  }
}

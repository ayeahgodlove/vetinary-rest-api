import { Request, Response } from "express";
import { LessonRepository } from "../../../data/repositories/impl/lms/lesson.repository";
import { LessonUseCase } from "../../../domain/usecases/lms/lesson.usecase";
import { LessonMapper } from "../../mappers/mapper";
import { LessonRequestDto } from "../../dtos/lms/lesson-request.dto";
import { displayValidationErrors } from "../../../utils/displayValidationErrors";
import {
  ILesson,
  ILessonResponse,
  emptyLesson,
} from "../../../domain/models/lms/lesson";
import { validate } from "class-validator";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

const lessonRepository = new LessonRepository();
const lessonUseCase = new LessonUseCase(lessonRepository);
const lessonMapper = new LessonMapper();

export class LessonsController {
  async createLesson(
    req: Request,
    res: Response<ILessonResponse>
  ): Promise<void> {
    const dto = new LessonRequestDto(req.body);
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
        const lessonResponse = await lessonUseCase.createLesson({
          ...dto.toData(),
          category: req.body.category,
          language: req.body.language,
          targetAudience: req.body.targetAudience,
          rating: req.body.rating,
        });

        res.status(201).json({
          data: lessonResponse.toJSON<ILesson>(),
          message: "Lesson created Successfully!",
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
      const lessons = await lessonUseCase.getAll();
      const lessonsDTO = lessonMapper.toDTOs(lessons);

      res.json({
        data: lessonsDTO,
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

  async getLessonById(
    req: Request,
    res: Response<ILessonResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const lesson = await lessonUseCase.getLessonById(id);
      if (!lesson) {
        throw new NotFoundException("Lesson", id);
      }
      const lessonDTO = lessonMapper.toDTO(lesson);
      res.json({
        data: lessonDTO,
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

  async updateLesson(
    req: Request,
    res: Response<ILessonResponse>
  ): Promise<void> {
    const dto = new LessonRequestDto(req.body);
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

        const obj: ILesson = {
          ...req.body,
          id: id,
          category: req.body.category,
          language: req.body.language,
          targetAudience: req.body.targetAudience,
          rating: req.body.rating
        };
        const updatedLesson = await lessonUseCase.updateLesson({
          ...dto.toUpdateData(obj),
        });
        const lessonDto = lessonMapper.toDTO(updatedLesson);

        res.json({
          data: lessonDto,
          message: "Lesson Updated Successfully!",
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

  async deleteLesson(
    req: Request,
    res: Response<ILessonResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await lessonUseCase.deleteLesson(id);

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

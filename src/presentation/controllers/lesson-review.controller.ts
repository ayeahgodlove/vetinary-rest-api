import { Request, Response } from "express";
import { LessonReviewUseCase } from "../../domain/usecases/lesson-review.usecase";
import { LessonReviewRepository } from "../../data/repositories/impl/lesson-review.repository";
import { LessonReviewMapper } from "../mappers/mapper";
import { LessonReviewRequestDto } from "../dtos/lesson-review-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import {
  ILessonReview,
  ILessonReviewResponse,
  emptyLessonReview,
} from "../../domain/models/lesson-review";

const lessonReviewRepository = new LessonReviewRepository();
const lessonReviewUseCase = new LessonReviewUseCase(lessonReviewRepository);
const lessonReviewMapper = new LessonReviewMapper();

export class LessonReviewsController {
  async createReview(
    req: Request,
    res: Response<ILessonReviewResponse>
  ): Promise<void> {
    const dto = new LessonReviewRequestDto(req.body);
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
        const reviewResponse = await lessonReviewUseCase.createLessonReview(
          dto.toData()
        );

        res.status(201).json({
          data: reviewResponse.toJSON<ILessonReview>(),
          message: "Review created Successfully!",
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
      const reviews = await lessonReviewUseCase.getAll();
      const reviewsDTO = lessonReviewMapper.toDTOs(reviews);

      res.json({
        data: reviewsDTO,
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

  async getReviewById(
    req: Request,
    res: Response<ILessonReviewResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const review = await lessonReviewUseCase.getLessonReviewById(id);
      if (!review) {
        throw new NotFoundException("Review", id);
      }
      const reviewDTO = lessonReviewMapper.toDTO(review);
      res.json({
        data: reviewDTO,
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

  async updateReview(
    req: Request,
    res: Response<ILessonReviewResponse>
  ): Promise<void> {
    const dto = new LessonReviewRequestDto(req.body);
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

        const obj: ILessonReview = {
          ...emptyLessonReview,
          ...req.body,
          id: id,
        };
        const updatedReview = await lessonReviewUseCase.updateLessonReview(obj);
        const reviewDto = lessonReviewMapper.toDTO(updatedReview);

        res.json({
          data: reviewDto,
          message: "Review Updated Successfully!",
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

  async deleteReview(
    req: Request,
    res: Response<ILessonReviewResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await lessonReviewUseCase.deleteLessonReview(id);

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

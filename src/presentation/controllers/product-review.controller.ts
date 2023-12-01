import { Request, Response } from "express";
import { ProductReviewUseCase } from "../../domain/usecases/product-review.usecase";
import { ProductReviewRepository } from "../../data/repositories/impl/product-review.repository";
import { ProductReviewMapper } from "../mappers/mapper";
import { ProductReviewRequestDto } from "../dtos/product-review-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import {
  IProductReview,
  IProductReviewResponse,
  emptyProductReview,
} from "../../domain/models/product-review";

const productReviewRepository = new ProductReviewRepository();
const reviewUseCase = new ProductReviewUseCase(productReviewRepository);
const productReviewMapper = new ProductReviewMapper();

export class ProductReviewsController {
  async createReview(
    req: Request,
    res: Response<IProductReviewResponse>
  ): Promise<void> {
    const dto = new ProductReviewRequestDto(req.body);
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
        const reviewResponse = await reviewUseCase.createProductReview(
          dto.toData()
        );

        res.status(201).json({
          data: reviewResponse.toJSON<IProductReview>(),
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
      const reviews = await reviewUseCase.getAll();
      const reviewsDTO = productReviewMapper.toDTOs(reviews);

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
    res: Response<IProductReviewResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const review = await reviewUseCase.getProductReviewById(id);
      if (!review) {
        throw new NotFoundException("Review", id);
      }
      const reviewDTO = productReviewMapper.toDTO(review);
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
    res: Response<IProductReviewResponse>
  ): Promise<void> {
    const dto = new ProductReviewRequestDto(req.body);
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

        const obj: IProductReview = {
          ...emptyProductReview,
          ...req.body,
          id: id,
        };
        const updatedReview = await reviewUseCase.updateProductReview(obj);
        const reviewDto = productReviewMapper.toDTO(updatedReview);

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
    res: Response<IProductReviewResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await reviewUseCase.deleteProductReview(id);

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

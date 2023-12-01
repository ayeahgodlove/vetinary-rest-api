"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const review_1 = require("../../domain/models/review");
const review_usecase_1 = require("../../domain/usecases/review.usecase");
const review_repository_1 = require("../../data/repositories/impl/review.repository");
const mapper_1 = require("../mappers/mapper");
const review_request_dto_1 = require("../dtos/review-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const reviewRepository = new review_repository_1.ReviewRepository();
const reviewUseCase = new review_usecase_1.ReviewUseCase(reviewRepository);
const reviewMapper = new mapper_1.ReviewMapper();
class ReviewsController {
    async createReview(req, res) {
        const dto = new review_request_dto_1.ReviewRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const reviewResponse = await reviewUseCase.createReview(dto.toData());
                res.status(201).json({
                    data: reviewResponse.toJSON(),
                    message: "Review created Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [],
                    success: false,
                });
            }
        }
    }
    async getAll(req, res) {
        try {
            const reviews = await reviewUseCase.getAll();
            const reviewsDTO = reviewMapper.toDTOs(reviews);
            res.json({
                data: reviewsDTO,
                message: "Success",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async getReviewById(req, res) {
        try {
            const id = req.params.id;
            const review = await reviewUseCase.getReviewById(id);
            if (!review) {
                throw new not_found_exception_1.NotFoundException("Review", id);
            }
            const reviewDTO = reviewMapper.toDTO(review);
            res.json({
                data: reviewDTO,
                message: "Success",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async updateReview(req, res) {
        const dto = new review_request_dto_1.ReviewRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const id = req.params.id;
                const obj = {
                    ...review_1.emptyReview,
                    ...req.body,
                    id: id,
                };
                const updatedReview = await reviewUseCase.updateReview(obj);
                const reviewDto = reviewMapper.toDTO(updatedReview);
                res.json({
                    data: reviewDto,
                    message: "Review Updated Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [error],
                    success: false,
                });
            }
        }
    }
    async deleteReview(req, res) {
        try {
            const id = req.params.id;
            await reviewUseCase.deleteReview(id);
            res.status(204).json({
                message: `Operation successfully completed!`,
                validationErrors: [],
                success: true,
                data: null,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                data: null,
                validationErrors: [error],
                success: true,
            });
        }
    }
}
exports.ReviewsController = ReviewsController;

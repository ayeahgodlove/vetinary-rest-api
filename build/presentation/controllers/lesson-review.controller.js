"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonReviewsController = void 0;
const lesson_review_usecase_1 = require("../../domain/usecases/lesson-review.usecase");
const lesson_review_repository_1 = require("../../data/repositories/impl/lesson-review.repository");
const mapper_1 = require("../mappers/mapper");
const lesson_review_request_dto_1 = require("../dtos/lesson-review-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const lesson_review_1 = require("../../domain/models/lesson-review");
const lessonReviewRepository = new lesson_review_repository_1.LessonReviewRepository();
const lessonReviewUseCase = new lesson_review_usecase_1.LessonReviewUseCase(lessonReviewRepository);
const lessonReviewMapper = new mapper_1.LessonReviewMapper();
class LessonReviewsController {
    async createReview(req, res) {
        const dto = new lesson_review_request_dto_1.LessonReviewRequestDto(req.body);
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
                const reviewResponse = await lessonReviewUseCase.createLessonReview(dto.toData());
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
            const reviews = await lessonReviewUseCase.getAll();
            const reviewsDTO = lessonReviewMapper.toDTOs(reviews);
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
            const review = await lessonReviewUseCase.getLessonReviewById(id);
            if (!review) {
                throw new not_found_exception_1.NotFoundException("Review", id);
            }
            const reviewDTO = lessonReviewMapper.toDTO(review);
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
        const dto = new lesson_review_request_dto_1.LessonReviewRequestDto(req.body);
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
                    ...lesson_review_1.emptyLessonReview,
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
            await lessonReviewUseCase.deleteLessonReview(id);
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
exports.LessonReviewsController = LessonReviewsController;

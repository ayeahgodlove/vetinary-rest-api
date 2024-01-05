"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewsController = void 0;
const product_review_usecase_1 = require("../../domain/usecases/product-review.usecase");
const product_review_repository_1 = require("../../data/repositories/impl/product-review.repository");
const mapper_1 = require("../mappers/mapper");
const product_review_request_dto_1 = require("../dtos/product-review-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const product_review_1 = require("../../domain/models/product-review");
const productReviewRepository = new product_review_repository_1.ProductReviewRepository();
const reviewUseCase = new product_review_usecase_1.ProductReviewUseCase(productReviewRepository);
const productReviewMapper = new mapper_1.ProductReviewMapper();
class ProductReviewsController {
    async createReview(req, res) {
        const dto = new product_review_request_dto_1.ProductReviewRequestDto(req.body);
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
                const reviewResponse = await reviewUseCase.createProductReview(dto.toData());
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
            const reviewsDTO = productReviewMapper.toDTOs(reviews);
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
            const review = await reviewUseCase.getProductReviewById(id);
            if (!review) {
                throw new not_found_exception_1.NotFoundException("Review", id);
            }
            const reviewDTO = productReviewMapper.toDTO(review);
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
        const dto = new product_review_request_dto_1.ProductReviewRequestDto(req.body);
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
                    ...product_review_1.emptyProductReview,
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
            await reviewUseCase.deleteProductReview(id);
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
exports.ProductReviewsController = ProductReviewsController;

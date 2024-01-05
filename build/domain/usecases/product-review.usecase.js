"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewUseCase = void 0;
class ProductReviewUseCase {
    productReviewRepository;
    /**
     *
     */
    constructor(productReviewRepository) {
        this.productReviewRepository = productReviewRepository;
    }
    async createProductReview(productReview) {
        return this.productReviewRepository.create(productReview);
    }
    async getAll() {
        return this.productReviewRepository.getAll();
    }
    async getProductReviewById(id) {
        return this.productReviewRepository.findById(id);
    }
    async updateProductReview(productReview) {
        const obj = {
            ...productReview,
            updatedAt: new Date(),
        };
        return this.productReviewRepository.update(obj);
    }
    async deleteProductReview(id) {
        return this.productReviewRepository.delete(id);
    }
}
exports.ProductReviewUseCase = ProductReviewUseCase;

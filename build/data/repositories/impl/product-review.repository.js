"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewRepository = void 0;
const product_review_1 = require("../../entities/product-review");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const user_1 = require("../../entities/user");
class ProductReviewRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a ProductReview as parameter
     * @productReview
     * returns void
     */
    async create(productReview) {
        try {
            return await product_review_1.ProductReview.create({ ...productReview });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns ProductReview
     */
    async findById(id) {
        try {
            const productReviewItem = await product_review_1.ProductReview.findByPk(id);
            if (!productReviewItem) {
                throw new not_found_exception_1.NotFoundException("ProductReview", id);
            }
            return productReviewItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns ProductReview
     */
    async findByName(name) {
        try {
            const productReviewItem = await product_review_1.ProductReview.findOne({
                include: [user_1.User],
            });
            return productReviewItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of ProductReview
     */
    async getAll() {
        try {
            const productReviews = await product_review_1.ProductReview.findAll();
            return productReviews;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a ProductReview as parameter
     * @productReview
     * returns void
     */
    async update(productReview) {
        const { id } = productReview;
        try {
            const productReviewItem = await product_review_1.ProductReview.findByPk(id);
            console.log(productReview);
            if (!productReviewItem) {
                throw new not_found_exception_1.NotFoundException("ProductReview", id.toString());
            }
            return await productReviewItem.update({ ...productReview });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const productReviewItem = await product_review_1.ProductReview.findByPk(id);
            if (!productReviewItem) {
                throw new not_found_exception_1.NotFoundException("ProductReview", id);
            }
            await productReviewItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProductReviewRepository = ProductReviewRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
const review_1 = require("../../entities/review");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const user_1 = require("../../entities/user");
class ReviewRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Review as parameter
     * @review
     * returns void
     */
    async create(review) {
        try {
            return await review_1.Review.create({ ...review });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Review
     */
    async findById(id) {
        try {
            const reviewItem = await review_1.Review.findByPk(id);
            if (!reviewItem) {
                throw new not_found_exception_1.NotFoundException("Review", id);
            }
            return reviewItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Review
     */
    async findByName(name) {
        try {
            const reviewItem = await review_1.Review.findOne({ include: [user_1.User] });
            return reviewItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Review
     */
    async getAll() {
        try {
            const reviews = await review_1.Review.findAll();
            return reviews;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Review as parameter
     * @review
     * returns void
     */
    async update(review) {
        const { id } = review;
        try {
            const reviewItem = await review_1.Review.findByPk(id);
            console.log(review);
            if (!reviewItem) {
                throw new not_found_exception_1.NotFoundException("Review", id.toString());
            }
            return await reviewItem.update({ ...review });
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
            const reviewItem = await review_1.Review.findByPk(id);
            if (!reviewItem) {
                throw new not_found_exception_1.NotFoundException("Review", id);
            }
            await reviewItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ReviewRepository = ReviewRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonReviewRepository = void 0;
const lesson_review_1 = require("../../entities/lesson-review");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const user_1 = require("../../entities/user");
class LessonReviewRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a LessonReview as parameter
     * @lessonReview
     * returns void
     */
    async create(lessonReview) {
        try {
            return await lesson_review_1.LessonReview.create({ ...lessonReview });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns LessonReview
     */
    async findById(id) {
        try {
            const lessonReviewItem = await lesson_review_1.LessonReview.findByPk(id);
            if (!lessonReviewItem) {
                throw new not_found_exception_1.NotFoundException("LessonReview", id);
            }
            return lessonReviewItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns LessonReview
     */
    async findByName(name) {
        try {
            const lessonReviewItem = await lesson_review_1.LessonReview.findOne({ include: [user_1.User] });
            return lessonReviewItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of LessonReview
     */
    async getAll() {
        try {
            const lessonReviews = await lesson_review_1.LessonReview.findAll();
            return lessonReviews;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a LessonReview as parameter
     * @lessonReview
     * returns void
     */
    async update(lessonReview) {
        const { id } = lessonReview;
        try {
            const lessonReviewItem = await lesson_review_1.LessonReview.findByPk(id);
            console.log(lessonReview);
            if (!lessonReviewItem) {
                throw new not_found_exception_1.NotFoundException("LessonReview", id.toString());
            }
            return await lessonReviewItem.update({ ...lessonReview });
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
            const lessonReviewItem = await lesson_review_1.LessonReview.findByPk(id);
            if (!lessonReviewItem) {
                throw new not_found_exception_1.NotFoundException("LessonReview", id);
            }
            await lessonReviewItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.LessonReviewRepository = LessonReviewRepository;

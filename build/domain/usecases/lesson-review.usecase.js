"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonReviewUseCase = void 0;
class LessonReviewUseCase {
    lessonReviewRepository;
    /**
     *
     */
    constructor(lessonReviewRepository) {
        this.lessonReviewRepository = lessonReviewRepository;
    }
    async createLessonReview(lessonReview) {
        return this.lessonReviewRepository.create(lessonReview);
    }
    async getAll() {
        return this.lessonReviewRepository.getAll();
    }
    async getLessonReviewById(id) {
        return this.lessonReviewRepository.findById(id);
    }
    async updateLessonReview(lessonReview) {
        const obj = {
            ...lessonReview,
            updatedAt: new Date(),
        };
        return this.lessonReviewRepository.update(obj);
    }
    async deleteLessonReview(id) {
        return this.lessonReviewRepository.delete(id);
    }
}
exports.LessonReviewUseCase = LessonReviewUseCase;

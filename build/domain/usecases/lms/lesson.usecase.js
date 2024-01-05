"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonUseCase = void 0;
class LessonUseCase {
    lessonRepository;
    /**
     *
     */
    constructor(lessonRepository) {
        this.lessonRepository = lessonRepository;
    }
    async createLesson(lesson) {
        const existingLesson = await this.lessonRepository.findByName(lesson.title);
        if (existingLesson) {
            throw new Error("Lesson already exists");
        }
        // const _lesson = new Lesson({lesson});
        //because it's already done in the Repository
        return this.lessonRepository.create(lesson);
    }
    async getAll() {
        return this.lessonRepository.getAll();
    }
    async getLessonById(id) {
        return this.lessonRepository.findById(id);
    }
    async updateLesson(lesson) {
        return this.lessonRepository.update(lesson);
    }
    async deleteLesson(id) {
        return this.lessonRepository.delete(id);
    }
}
exports.LessonUseCase = LessonUseCase;

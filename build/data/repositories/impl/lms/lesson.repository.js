"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRepository = void 0;
const not_found_exception_1 = require("../../../../shared/exceptions/not-found.exception");
const lesson_1 = require("../../../entities/lms/lesson");
class LessonRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Lesson as parameter
     * @lesson
     * returns void
     */
    async create(lesson) {
        try {
            return await lesson_1.Lesson.create({ ...lesson });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Lesson
     */
    async findById(id) {
        try {
            const lessonItem = await lesson_1.Lesson.findByPk(id);
            if (!lessonItem) {
                throw new not_found_exception_1.NotFoundException("Lesson", id);
            }
            return lessonItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Lesson
     */
    async findByName(title) {
        try {
            const lessonItem = await lesson_1.Lesson.findOne({ where: { title } });
            return lessonItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Lesson
     */
    async getAll() {
        try {
            const categories = await lesson_1.Lesson.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Lesson as parameter
     * @lesson
     * returns void
     */
    async update(lesson) {
        const { id } = lesson;
        try {
            const lessonItem = await lesson_1.Lesson.findByPk(id);
            console.log(lesson);
            if (!lessonItem) {
                throw new not_found_exception_1.NotFoundException("Lesson", id.toString());
            }
            return await lessonItem.update({ ...lesson });
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
            const lessonItem = await lesson_1.Lesson.findByPk(id);
            if (!lessonItem) {
                throw new not_found_exception_1.NotFoundException("Lesson", id);
            }
            await lessonItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.LessonRepository = LessonRepository;

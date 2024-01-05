"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const not_found_exception_1 = require("../../../../shared/exceptions/not-found.exception");
const course_1 = require("../../../entities/lms/course");
class CourseRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Course as parameter
     * @course
     * returns void
     */
    async create(course) {
        try {
            return await course_1.Course.create({ ...course });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Course
     */
    async findById(id) {
        try {
            const courseItem = await course_1.Course.findByPk(id);
            if (!courseItem) {
                throw new not_found_exception_1.NotFoundException("Course", id);
            }
            return courseItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Course
     */
    async findByName(title) {
        try {
            const courseItem = await course_1.Course.findOne({ where: { title } });
            return courseItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Course
     */
    async getAll() {
        try {
            const categories = await course_1.Course.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Course as parameter
     * @course
     * returns void
     */
    async update(course) {
        const { id } = course;
        try {
            const courseItem = await course_1.Course.findByPk(id);
            console.log(course);
            if (!courseItem) {
                throw new not_found_exception_1.NotFoundException("Course", id.toString());
            }
            return await courseItem.update({ ...course });
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
            const courseItem = await course_1.Course.findByPk(id);
            if (!courseItem) {
                throw new not_found_exception_1.NotFoundException("Course", id);
            }
            await courseItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CourseRepository = CourseRepository;

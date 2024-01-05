"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseUseCase = void 0;
class CourseUseCase {
    courseRepository;
    /**
     *
     */
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async createCourse(course) {
        const existingCourse = await this.courseRepository.findByName(course.title);
        if (existingCourse) {
            throw new Error("Course already exists");
        }
        // const _course = new Course({course});
        //because it's already done in the Repository
        return this.courseRepository.create(course);
    }
    async getAll() {
        return this.courseRepository.getAll();
    }
    async getCourseById(id) {
        return this.courseRepository.findById(id);
    }
    async updateCourse(course) {
        return this.courseRepository.update(course);
    }
    async deleteCourse(id) {
        return this.courseRepository.delete(id);
    }
}
exports.CourseUseCase = CourseUseCase;

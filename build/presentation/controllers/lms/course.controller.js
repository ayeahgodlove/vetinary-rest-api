"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const course_repository_1 = require("../../../data/repositories/impl/lms/course.repository");
const course_usecase_1 = require("../../../domain/usecases/lms/course.usecase");
const mapper_1 = require("../../mappers/mapper");
const course_request_dto_1 = require("../../dtos/lms/course-request.dto");
const displayValidationErrors_1 = require("../../../utils/displayValidationErrors");
const course_1 = require("../../../domain/models/lms/course");
const class_validator_1 = require("class-validator");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const courseRepository = new course_repository_1.CourseRepository();
const courseUseCase = new course_usecase_1.CourseUseCase(courseRepository);
const courseMapper = new mapper_1.CourseMapper();
class CoursesController {
    async createCourse(req, res) {
        const dto = new course_request_dto_1.CourseRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        const { filename } = req.file;
        if (filename === undefined) {
            throw new Error("Photo not found!");
        }
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
                const courseResponse = await courseUseCase.createCourse({
                    ...dto.toData(),
                    courseImage: filename.toString(),
                    completionDate: req.body.completionDate,
                    startDate: req.body.startDate
                });
                res.status(201).json({
                    data: courseResponse.toJSON(),
                    message: "Course created Successfully!",
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
            const courses = await courseUseCase.getAll();
            const coursesDTO = courseMapper.toDTOs(courses);
            res.json({
                data: coursesDTO,
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
    async getCourseById(req, res) {
        try {
            const id = req.params.id;
            const course = await courseUseCase.getCourseById(id);
            if (!course) {
                throw new not_found_exception_1.NotFoundException("Course", id);
            }
            const courseDTO = courseMapper.toDTO(course);
            res.json({
                data: courseDTO,
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
    async updateCourse(req, res) {
        const dto = new course_request_dto_1.CourseRequestDto(req.body);
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
                    ...course_1.emptyCourse,
                    ...req.body,
                    id: id,
                };
                const updatedCourse = await courseUseCase.updateCourse(obj);
                const courseDto = courseMapper.toDTO(updatedCourse);
                res.json({
                    data: courseDto,
                    message: "Course Updated Successfully!",
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
    async deleteCourse(req, res) {
        try {
            const id = req.params.id;
            await courseUseCase.deleteCourse(id);
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
exports.CoursesController = CoursesController;

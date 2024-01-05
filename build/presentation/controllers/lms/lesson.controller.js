"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsController = void 0;
const lesson_repository_1 = require("../../../data/repositories/impl/lms/lesson.repository");
const lesson_usecase_1 = require("../../../domain/usecases/lms/lesson.usecase");
const mapper_1 = require("../../mappers/mapper");
const lesson_request_dto_1 = require("../../dtos/lms/lesson-request.dto");
const displayValidationErrors_1 = require("../../../utils/displayValidationErrors");
const class_validator_1 = require("class-validator");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const lessonRepository = new lesson_repository_1.LessonRepository();
const lessonUseCase = new lesson_usecase_1.LessonUseCase(lessonRepository);
const lessonMapper = new mapper_1.LessonMapper();
class LessonsController {
    async createLesson(req, res) {
        const dto = new lesson_request_dto_1.LessonRequestDto(req.body);
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
                const lessonResponse = await lessonUseCase.createLesson({
                    ...dto.toData(),
                    category: req.body.category,
                    language: req.body.language,
                    targetAudience: req.body.targetAudience,
                    rating: req.body.rating,
                });
                res.status(201).json({
                    data: lessonResponse.toJSON(),
                    message: "Lesson created Successfully!",
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
            const lessons = await lessonUseCase.getAll();
            const lessonsDTO = lessonMapper.toDTOs(lessons);
            res.json({
                data: lessonsDTO,
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
    async getLessonById(req, res) {
        try {
            const id = req.params.id;
            const lesson = await lessonUseCase.getLessonById(id);
            if (!lesson) {
                throw new not_found_exception_1.NotFoundException("Lesson", id);
            }
            const lessonDTO = lessonMapper.toDTO(lesson);
            res.json({
                data: lessonDTO,
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
    async updateLesson(req, res) {
        const dto = new lesson_request_dto_1.LessonRequestDto(req.body);
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
                    ...req.body,
                    id: id,
                    category: req.body.category,
                    language: req.body.language,
                    targetAudience: req.body.targetAudience,
                    rating: req.body.rating
                };
                const updatedLesson = await lessonUseCase.updateLesson({
                    ...dto.toUpdateData(obj),
                });
                const lessonDto = lessonMapper.toDTO(updatedLesson);
                res.json({
                    data: lessonDto,
                    message: "Lesson Updated Successfully!",
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
    async deleteLesson(req, res) {
        try {
            const id = req.params.id;
            await lessonUseCase.deleteLesson(id);
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
exports.LessonsController = LessonsController;

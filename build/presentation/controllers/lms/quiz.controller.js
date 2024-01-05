"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizesController = void 0;
const quiz_repository_1 = require("../../../data/repositories/impl/lms/quiz.repository");
const quiz_usecase_1 = require("../../../domain/usecases/lms/quiz.usecase");
const mapper_1 = require("../../mappers/mapper");
const quiz_request_dto_1 = require("../../dtos/lms/quiz-request.dto");
const displayValidationErrors_1 = require("../../../utils/displayValidationErrors");
const quiz_1 = require("../../../domain/models/lms/quiz");
const class_validator_1 = require("class-validator");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const quizRepository = new quiz_repository_1.QuizRepository();
const quizUseCase = new quiz_usecase_1.QuizUseCase(quizRepository);
const quizMapper = new mapper_1.QuizMapper();
class QuizesController {
    async createQuiz(req, res) {
        const dto = new quiz_request_dto_1.QuizRequestDto(req.body);
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
                const quizResponse = await quizUseCase.createQuiz({
                    ...dto.toData(),
                });
                res.status(201).json({
                    data: quizResponse.toJSON(),
                    message: "Quiz created Successfully!",
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
            const quizes = await quizUseCase.getAll();
            const quizesDTO = quizMapper.toDTOs(quizes);
            res.json({
                data: quizesDTO,
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
    async getQuizById(req, res) {
        try {
            const id = req.params.id;
            const quiz = await quizUseCase.getQuizById(id);
            if (!quiz) {
                throw new not_found_exception_1.NotFoundException("Quiz", id);
            }
            const quizDTO = quizMapper.toDTO(quiz);
            res.json({
                data: quizDTO,
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
    async updateQuiz(req, res) {
        const dto = new quiz_request_dto_1.QuizRequestDto(req.body);
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
                    ...quiz_1.emptyQuiz,
                    ...req.body,
                    id: id,
                };
                const updatedQuiz = await quizUseCase.updateQuiz(obj);
                const quizDto = quizMapper.toDTO(updatedQuiz);
                res.json({
                    data: quizDto,
                    message: "Quiz Updated Successfully!",
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
    async deleteQuiz(req, res) {
        try {
            const id = req.params.id;
            await quizUseCase.deleteQuiz(id);
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
exports.QuizesController = QuizesController;

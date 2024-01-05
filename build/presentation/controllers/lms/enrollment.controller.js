"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentsController = void 0;
const enrollment_repository_1 = require("../../../data/repositories/impl/lms/enrollment.repository");
const enrollment_usecase_1 = require("../../../domain/usecases/lms/enrollment.usecase");
const mapper_1 = require("../../mappers/mapper");
const enrollment_request_dto_1 = require("../../dtos/lms/enrollment-request.dto");
const displayValidationErrors_1 = require("../../../utils/displayValidationErrors");
const enrollment_1 = require("../../../domain/models/lms/enrollment");
const class_validator_1 = require("class-validator");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const enrollmentRepository = new enrollment_repository_1.EnrollmentRepository();
const enrollmentUseCase = new enrollment_usecase_1.EnrollmentUseCase(enrollmentRepository);
const enrollmentMapper = new mapper_1.EnrollmentMapper();
class EnrollmentsController {
    async createEnrollment(req, res) {
        const dto = new enrollment_request_dto_1.EnrollmentRequestDto(req.body);
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
                const enrollmentResponse = await enrollmentUseCase.createEnrollment({
                    ...dto.toData(),
                    completionDate: req.body.completionDate,
                    enrollmentDate: req.body.enrollmentDate,
                });
                res.status(201).json({
                    data: enrollmentResponse.toJSON(),
                    message: "Enrollment created Successfully!",
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
            const enrollments = await enrollmentUseCase.getAll();
            const enrollmentsDTO = enrollmentMapper.toDTOs(enrollments);
            res.json({
                data: enrollmentsDTO,
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
    async getEnrollmentById(req, res) {
        try {
            const id = req.params.id;
            const enrollment = await enrollmentUseCase.getEnrollmentById(id);
            if (!enrollment) {
                throw new not_found_exception_1.NotFoundException("Enrollment", id);
            }
            const enrollmentDTO = enrollmentMapper.toDTO(enrollment);
            res.json({
                data: enrollmentDTO,
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
    async updateEnrollment(req, res) {
        const dto = new enrollment_request_dto_1.EnrollmentRequestDto(req.body);
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
                    ...enrollment_1.emptyEnrollment,
                    ...req.body,
                    id: id,
                };
                const updatedEnrollment = await enrollmentUseCase.updateEnrollment(obj);
                const enrollmentDto = enrollmentMapper.toDTO(updatedEnrollment);
                res.json({
                    data: enrollmentDto,
                    message: "Enrollment Updated Successfully!",
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
    async deleteEnrollment(req, res) {
        try {
            const id = req.params.id;
            await enrollmentUseCase.deleteEnrollment(id);
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
exports.EnrollmentsController = EnrollmentsController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationsController = void 0;
const class_validator_1 = require("class-validator");
const consultation_repository_1 = require("../../../data/repositories/impl/health/consultation.repository");
const displayValidationErrors_1 = require("../../../utils/displayValidationErrors");
const consultation_usecase_1 = require("../../../domain/usecases/health/consultation.usecase");
const mapper_1 = require("../../mappers/mapper");
const consultation_1 = require("../../../domain/models/health/consultation");
const consultation_request_dto_1 = require("../../dtos/health/consultation-request.dto");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const consultationRepository = new consultation_repository_1.ConsultationRepository();
const consultationUseCase = new consultation_usecase_1.ConsultationUseCase(consultationRepository);
const consultationMapper = new mapper_1.ConsultationMapper();
class ConsultationsController {
    async createConsultation(req, res) {
        const dto = new consultation_request_dto_1.ConsultationRequestDto(req.body);
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
                const consultationResponse = await consultationUseCase.createConsultation(dto.toData());
                res.status(201).json({
                    data: consultationResponse.toJSON(),
                    message: "Consultation created Successfully!",
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
            const consultationes = await consultationUseCase.getAll();
            const consultationesDTO = consultationMapper.toDTOs(consultationes);
            res.json({
                data: consultationesDTO,
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
    async getConsultationById(req, res) {
        try {
            const id = req.params.id;
            const consultation = await consultationUseCase.getConsultationById(id);
            if (!consultation) {
                throw new not_found_exception_1.NotFoundException("Consultation", id);
            }
            const consultationDTO = consultationMapper.toDTO(consultation);
            res.json({
                data: consultationDTO,
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
    async updateConsultation(req, res) {
        const dto = new consultation_request_dto_1.ConsultationRequestDto(req.body);
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
                    ...consultation_1.emptyConsultation,
                    ...req.body,
                    id: id,
                };
                const updatedConsultation = await consultationUseCase.updateConsultation(obj);
                const consultationDto = consultationMapper.toDTO(updatedConsultation);
                res.json({
                    data: consultationDto,
                    message: "Consultation Updated Successfully!",
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
    async deleteConsultation(req, res) {
        try {
            const id = req.params.id;
            await consultationUseCase.deleteConsultation(id);
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
exports.ConsultationsController = ConsultationsController;

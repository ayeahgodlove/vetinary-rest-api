"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const class_validator_1 = require("class-validator");
const appointment_repository_1 = require("../../../data/repositories/impl/health/appointment.repository");
const appointment_usecase_1 = require("../../../domain/usecases/health/appointment.usecase");
const mapper_1 = require("../../mappers/mapper");
const appointment_request_dto_1 = require("../../dtos/health/appointment-request.dto");
const displayValidationErrors_1 = require("../../../utils/displayValidationErrors");
const appointment_1 = require("../../../domain/models/health/appointment");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const appointmentRepository = new appointment_repository_1.AppointmentRepository();
const appointmentUseCase = new appointment_usecase_1.AppointmentUseCase(appointmentRepository);
const appointmentMapper = new mapper_1.AppointmentMapper();
class AppointmentsController {
    async createAppointment(req, res) {
        const dto = new appointment_request_dto_1.AppointmentRequestDto(req.body);
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
                const appointmentResponse = await appointmentUseCase.createAppointment(dto.toData());
                res.status(201).json({
                    data: appointmentResponse.toJSON(),
                    message: "Appointment created Successfully!",
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
            const appointmentes = await appointmentUseCase.getAll();
            const appointmentesDTO = appointmentMapper.toDTOs(appointmentes);
            res.json({
                data: appointmentesDTO,
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
    async getAppointmentById(req, res) {
        try {
            const id = req.params.id;
            const appointment = await appointmentUseCase.getAppointmentById(id);
            if (!appointment) {
                throw new not_found_exception_1.NotFoundException("Appointment", id);
            }
            const appointmentDTO = appointmentMapper.toDTO(appointment);
            res.json({
                data: appointmentDTO,
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
    async updateAppointment(req, res) {
        const dto = new appointment_request_dto_1.AppointmentRequestDto(req.body);
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
                    ...appointment_1.emptyAppointment,
                    ...req.body,
                    id: id,
                };
                const updatedAppointment = await appointmentUseCase.updateAppointment(obj);
                const appointmentDto = appointmentMapper.toDTO(updatedAppointment);
                res.json({
                    data: appointmentDto,
                    message: "Appointment Updated Successfully!",
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
    async deleteAppointment(req, res) {
        try {
            const id = req.params.id;
            await appointmentUseCase.deleteAppointment(id);
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
exports.AppointmentsController = AppointmentsController;

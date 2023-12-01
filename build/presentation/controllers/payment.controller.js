"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const payment_1 = require("../../domain/models/payment");
const payment_usecase_1 = require("../../domain/usecases/payment.usecase");
const payment_request_dto_1 = require("../dtos/payment-request.dto");
const class_validator_1 = require("class-validator");
const payment_repository_1 = require("../../data/repositories/impl/payment.repository");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const mapper_1 = require("../mappers/mapper");
const paymentRepository = new payment_repository_1.PaymentRepository();
const paymentUseCase = new payment_usecase_1.PaymentUseCase(paymentRepository);
const paymentMapper = new mapper_1.PaymentMapper();
class PaymentsController {
    async createPayment(req, res) {
        const dto = new payment_request_dto_1.PaymentRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!"
            });
        }
        else {
            try {
                const paymentResponse = await paymentUseCase.createPayment(dto.toData());
                res.status(201).json({
                    data: paymentResponse.toJSON(),
                    message: "Payment created Successfully!",
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
    async getAll(req, res) {
        try {
            const payments = await paymentUseCase.getAll();
            const paymentsDTO = paymentMapper.toDTOs(payments);
            res.json({
                data: paymentsDTO,
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
    async getPaymentById(req, res) {
        try {
            const id = req.params.id;
            const payment = await paymentUseCase.getPaymentById(id);
            if (!payment) {
                throw new not_found_exception_1.NotFoundException("Payment", id);
            }
            const paymentDTO = paymentMapper.toDTO(payment);
            res.json({
                data: paymentDTO,
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
    async updatePayment(req, res) {
        const dto = new payment_request_dto_1.PaymentRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!"
            });
        }
        else {
            try {
                const id = req.params.id;
                const obj = {
                    ...payment_1.emptyPayment,
                    ...req.body,
                    ...dto,
                    id: id,
                };
                const payment = await paymentUseCase.getPaymentById(id);
                if (!payment) {
                    throw new not_found_exception_1.NotFoundException("Payment", id);
                }
                const updatedPayment = await paymentUseCase.updatePayment(obj);
                const paymentDto = paymentMapper.toDTO(updatedPayment);
                res.json({
                    data: paymentDto,
                    message: "Payment Updated Successfully!",
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
    async deletePayment(req, res) {
        try {
            const id = req.params.id;
            const payment = await paymentUseCase.getPaymentById(id);
            if (!payment) {
                throw new not_found_exception_1.NotFoundException("Payment", id);
            }
            await paymentUseCase.deletePayment(id);
            res.status(204).json({
                message: `Operation successfully completed!`,
                validationErrors: [],
                success: true,
                data: null
            });
        }
        catch (error) {
            res
                .status(400)
                .json({
                message: error.message,
                data: null,
                validationErrors: [error],
                success: true,
            });
        }
    }
}
exports.PaymentsController = PaymentsController;

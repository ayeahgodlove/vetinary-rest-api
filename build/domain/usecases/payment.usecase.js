"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentUseCase = void 0;
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
class PaymentUseCase {
    paymentRepository;
    /**
     *
     */
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async createPayment(payment) {
        const existingPayment = await this.paymentRepository.findByOrderId(payment.orderNo);
        if (existingPayment) {
            throw new not_found_exception_1.NotFoundException("Payment", payment.orderNo);
        }
        // const _payment = new Payment({payment});
        //because it's already done in the Repository
        return this.paymentRepository.create(payment);
    }
    async getAll() {
        return this.paymentRepository.getAll();
    }
    async getPaymentById(id) {
        return this.paymentRepository.findById(id);
    }
    async getPaymentByOrderNo(payment) {
        const _payment = await this.paymentRepository.findByOrderId(payment.orderNo);
        if (!_payment) {
            return null;
        }
        return _payment;
    }
    async updatePayment(payment) {
        return this.paymentRepository.update(payment);
    }
    async deletePayment(id) {
        return this.paymentRepository.delete(id);
    }
}
exports.PaymentUseCase = PaymentUseCase;

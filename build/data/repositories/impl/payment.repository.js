"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const payment_1 = require("../../entities/payment");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class PaymentRepository {
    /**
     *
     */
    constructor() { }
    findByName(name) {
        throw new Error("Method not implemented.");
    }
    /**
     * Receives a Payment as parameter
     * @payment
     * returns void
     */
    async create(payment) {
        try {
            return await payment_1.Payment.create(payment);
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Payment
     */
    async findById(id) {
        try {
            const paymentItem = await payment_1.Payment.findByPk(id);
            if (!paymentItem) {
                throw new not_found_exception_1.NotFoundException("Payment", id);
            }
            return paymentItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Payment
     */
    async findByOrderId(orderNo) {
        try {
            const paymentItem = await payment_1.Payment.findOne({ where: { orderNo } });
            return paymentItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Payment
     */
    async getAll() {
        try {
            const payments = await payment_1.Payment.findAll();
            return payments;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Payment as parameter
     * @payment
     * returns void
     */
    async update(payment) {
        const { id } = payment;
        try {
            const paymentItem = await payment_1.Payment.findByPk(id);
            if (!paymentItem) {
                throw new not_found_exception_1.NotFoundException("Payment", id);
            }
            return await paymentItem.update(payment);
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
            const paymentItem = await payment_1.Payment.findByPk(id);
            if (!paymentItem) {
                throw new not_found_exception_1.NotFoundException("Payment", id);
            }
            await paymentItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.PaymentRepository = PaymentRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUseCase = void 0;
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
class OrderUseCase {
    orderRepository;
    /**
     *
     */
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async createOrder(order) {
        const existingOrder = await this.orderRepository.findByOrderNo(order.orderNo);
        if (existingOrder) {
            throw new not_found_exception_1.NotFoundException("Order", order.orderNo);
        }
        // const _order = new Order({order}); 
        //because it's already done in the Repository
        return this.orderRepository.create(order);
    }
    async getAll() {
        return this.orderRepository.getAll();
    }
    async getOrderById(id) {
        return this.orderRepository.findById(id);
    }
    async getOrderByOrderNo(order) {
        const _order = await this.orderRepository.findByOrderNo(order.orderNo);
        if (!_order) {
            return null;
        }
        return _order;
    }
    async updateOrder(order) {
        return this.orderRepository.update(order);
    }
    async deleteOrder(id) {
        return this.orderRepository.delete(id);
    }
}
exports.OrderUseCase = OrderUseCase;

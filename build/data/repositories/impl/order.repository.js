"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const order_1 = require("../../entities/order");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class OrderRepository {
    /**
     *
     */
    constructor() { }
    findByName(name) {
        throw new Error("Method not implemented.");
    }
    /**
     * Receives a Order as parameter
     * @order
     * returns void
     */
    async create(order) {
        try {
            return await order_1.Order.create({ ...order });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Order
     */
    async findById(id) {
        try {
            const orderItem = await order_1.Order.findByPk(id);
            if (!orderItem) {
                throw new not_found_exception_1.NotFoundException("Order", id);
            }
            return orderItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @orderNo
     * returns Order
     */
    async findByOrderNo(orderNo) {
        try {
            const orderItem = await order_1.Order.findOne({ where: { orderNo } });
            return orderItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Order
     */
    async getAll() {
        try {
            const orders = await order_1.Order.findAll();
            return orders;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Order as parameter
     * @order
     * returns void
     */
    async update(order) {
        const { id } = order;
        try {
            const orderItem = await order_1.Order.findByPk(id);
            if (!orderItem) {
                throw new not_found_exception_1.NotFoundException("Order", id.toString());
            }
            return await orderItem.update(order);
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
            const orderItem = await order_1.Order.findByPk(id);
            if (!orderItem) {
                throw new not_found_exception_1.NotFoundException("Order", id);
            }
            await orderItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OrderRepository = OrderRepository;

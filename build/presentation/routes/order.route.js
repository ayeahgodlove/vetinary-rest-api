"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/order-routes.ts
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const orderController = new order_controller_1.OrdersController();
const orderRouter = (0, express_1.Router)();
orderRouter.get("", is_authenticated_middleware_1.isAuthenticatedMiddleware, orderController.getAll);
orderRouter.get("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, orderController.getOrderById);
orderRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, orderController.createOrder);
orderRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, orderController.updateOrder);
orderRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, orderController.deleteOrder);
exports.default = orderRouter;

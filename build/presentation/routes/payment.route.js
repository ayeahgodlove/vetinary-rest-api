"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/payment-routes.ts
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const paymentController = new payment_controller_1.PaymentsController();
const paymentRouter = (0, express_1.Router)();
paymentRouter.get('', is_authenticated_middleware_1.isAuthenticatedMiddleware, paymentController.getAll);
paymentRouter.get('/:id', is_authenticated_middleware_1.isAuthenticatedMiddleware, paymentController.getPaymentById);
paymentRouter.post('', is_authenticated_middleware_1.isAuthenticatedMiddleware, paymentController.createPayment);
paymentRouter.put('/:id', is_authenticated_middleware_1.isAuthenticatedMiddleware, paymentController.updatePayment);
paymentRouter.delete('/:id', is_authenticated_middleware_1.isAuthenticatedMiddleware, paymentController.deletePayment);
exports.default = paymentRouter;

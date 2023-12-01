"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const process_payment_controller_1 = require("../../../infrastructure/momo-api/process-payment.controller");
const is_authenticated_middleware_1 = require("../../../shared/middlewares/is-authenticated.middleware");
const processPaymentRouter = express_1.default.Router();
processPaymentRouter.post("/", is_authenticated_middleware_1.isAuthenticatedMiddleware, process_payment_controller_1.initiatePayment);
processPaymentRouter.get("/:reference", is_authenticated_middleware_1.isAuthenticatedMiddleware, process_payment_controller_1.transactionStatus);
processPaymentRouter.post("/history", is_authenticated_middleware_1.isAuthenticatedMiddleware, process_payment_controller_1.getTransactions);
exports.default = processPaymentRouter;

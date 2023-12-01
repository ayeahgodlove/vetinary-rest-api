import express from "express";
import { getTransactions, initiatePayment, transactionStatus } from "../../../infrastructure/momo-api/process-payment.controller";
import { isAuthenticatedMiddleware } from "../../../shared/middlewares/is-authenticated.middleware";

const processPaymentRouter = express.Router();


processPaymentRouter.post("/", isAuthenticatedMiddleware, initiatePayment);
processPaymentRouter.get("/:reference", isAuthenticatedMiddleware, transactionStatus);
processPaymentRouter.post("/history", isAuthenticatedMiddleware, getTransactions);

export default processPaymentRouter;

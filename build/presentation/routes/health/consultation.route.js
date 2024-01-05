"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/consultation-routes.ts
const express_1 = require("express");
const is_authenticated_middleware_1 = require("../../../shared/middlewares/is-authenticated.middleware");
const consultation_controller_1 = require("../../controllers/health/consultation.controller");
const consultationController = new consultation_controller_1.ConsultationsController();
const consultationRouter = (0, express_1.Router)();
consultationRouter.get("", consultationController.getAll);
consultationRouter.get("/:id", consultationController.getConsultationById);
consultationRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, consultationController.createConsultation);
consultationRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, consultationController.updateConsultation);
consultationRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, consultationController.deleteConsultation);
exports.default = consultationRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/enrollment-routes.ts
const express_1 = require("express");
const is_authenticated_middleware_1 = require("../../../shared/middlewares/is-authenticated.middleware");
const enrollment_controller_1 = require("../../controllers/lms/enrollment.controller");
const enrollmentController = new enrollment_controller_1.EnrollmentsController();
const enrollmentRouter = (0, express_1.Router)();
enrollmentRouter.get("", enrollmentController.getAll);
enrollmentRouter.get("/:id", enrollmentController.getEnrollmentById);
enrollmentRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, enrollmentController.createEnrollment);
enrollmentRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, enrollmentController.updateEnrollment);
enrollmentRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, enrollmentController.deleteEnrollment);
exports.default = enrollmentRouter;

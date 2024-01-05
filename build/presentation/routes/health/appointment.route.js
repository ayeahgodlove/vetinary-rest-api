"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/appointment-routes.ts
const express_1 = require("express");
const is_authenticated_middleware_1 = require("../../../shared/middlewares/is-authenticated.middleware");
const appointment_controller_1 = require("../../controllers/health/appointment.controller");
const appointmentController = new appointment_controller_1.AppointmentsController();
const appointmentRouter = (0, express_1.Router)();
appointmentRouter.get("", appointmentController.getAll);
appointmentRouter.get("/:id", appointmentController.getAppointmentById);
appointmentRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, appointmentController.createAppointment);
appointmentRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, appointmentController.updateAppointment);
appointmentRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, appointmentController.deleteAppointment);
exports.default = appointmentRouter;

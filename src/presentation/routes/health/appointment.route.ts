// src/infrastructure/routes/appointment-routes.ts
import { Router } from "express";
import { isAuthenticatedMiddleware } from "../../../shared/middlewares/is-authenticated.middleware";
import { AppointmentsController } from "../../controllers/health/appointment.controller";

const appointmentController = new AppointmentsController();

const appointmentRouter = Router();

appointmentRouter.get("", appointmentController.getAll);
appointmentRouter.get("/:id", appointmentController.getAppointmentById);
appointmentRouter.post("", isAuthenticatedMiddleware, appointmentController.createAppointment);
appointmentRouter.put("/:id", isAuthenticatedMiddleware, appointmentController.updateAppointment);
appointmentRouter.delete("/:id", isAuthenticatedMiddleware, appointmentController.deleteAppointment);

export default appointmentRouter;

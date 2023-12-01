// src/infrastructure/routes/enrollment-routes.ts
import { Router } from "express";
import { isAuthenticatedMiddleware } from "../../../shared/middlewares/is-authenticated.middleware";
import { EnrollmentsController } from "../../controllers/lms/enrollment.controller";

const enrollmentController = new EnrollmentsController();

const enrollmentRouter = Router();

enrollmentRouter.get("", enrollmentController.getAll);
enrollmentRouter.get("/:id", enrollmentController.getEnrollmentById);
enrollmentRouter.post("",isAuthenticatedMiddleware, enrollmentController.createEnrollment);
enrollmentRouter.put("/:id",isAuthenticatedMiddleware, enrollmentController.updateEnrollment);
enrollmentRouter.delete("/:id",isAuthenticatedMiddleware, enrollmentController.deleteEnrollment);

export default enrollmentRouter;

// src/infrastructure/routes/consultation-routes.ts
import { Router } from "express";
import { isAuthenticatedMiddleware } from "../../../shared/middlewares/is-authenticated.middleware";
import { ConsultationsController } from "../../controllers/health/consultation.controller";

const consultationController = new ConsultationsController();

const consultationRouter = Router();

consultationRouter.get("", consultationController.getAll);
consultationRouter.get("/:id", consultationController.getConsultationById);
consultationRouter.post("", isAuthenticatedMiddleware, consultationController.createConsultation);
consultationRouter.put("/:id", isAuthenticatedMiddleware, consultationController.updateConsultation);
consultationRouter.delete("/:id", isAuthenticatedMiddleware, consultationController.deleteConsultation);

export default consultationRouter;

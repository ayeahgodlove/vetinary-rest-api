// src/infrastructure/routes/lesson-routes.ts
import { Router } from "express";
import { isAuthenticatedMiddleware } from "../../../shared/middlewares/is-authenticated.middleware";
import { LessonsController } from "../../controllers/lms/lesson.controller";

const lessonController = new LessonsController();

const lessonRouter = Router();

lessonRouter.get("", lessonController.getAll);
lessonRouter.get("/:id", lessonController.getLessonById);
lessonRouter.post("",isAuthenticatedMiddleware, lessonController.createLesson);
lessonRouter.put("/:id",isAuthenticatedMiddleware, lessonController.updateLesson);
lessonRouter.delete("/:id",isAuthenticatedMiddleware, lessonController.deleteLesson);

export default lessonRouter;

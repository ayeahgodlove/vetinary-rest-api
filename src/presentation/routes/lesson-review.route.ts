// src/infrastructure/routes/review-routes.ts
import { Router } from "express";
import { LessonReviewsController } from "../controllers/lesson-review.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const lessonReviewController = new LessonReviewsController();

const lessonReviewRouter = Router();

lessonReviewRouter.get("", lessonReviewController.getAll);
lessonReviewRouter.get("/:id", lessonReviewController.getReviewById);
lessonReviewRouter.post("", isAuthenticatedMiddleware, lessonReviewController.createReview);
lessonReviewRouter.put("/:id", isAuthenticatedMiddleware, lessonReviewController.updateReview);
lessonReviewRouter.delete("/:id", isAuthenticatedMiddleware, lessonReviewController.deleteReview);

export default lessonReviewRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/review-routes.ts
const express_1 = require("express");
const lesson_review_controller_1 = require("../controllers/lesson-review.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const lessonReviewController = new lesson_review_controller_1.LessonReviewsController();
const lessonReviewRouter = (0, express_1.Router)();
lessonReviewRouter.get("", lessonReviewController.getAll);
lessonReviewRouter.get("/:id", lessonReviewController.getReviewById);
lessonReviewRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, lessonReviewController.createReview);
lessonReviewRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, lessonReviewController.updateReview);
lessonReviewRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, lessonReviewController.deleteReview);
exports.default = lessonReviewRouter;

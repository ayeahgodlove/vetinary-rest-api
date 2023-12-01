"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/review-routes.ts
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const reviewController = new review_controller_1.ReviewsController();
const reviewRouter = (0, express_1.Router)();
reviewRouter.get("", reviewController.getAll);
reviewRouter.get("/:id", reviewController.getReviewById);
reviewRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, reviewController.createReview);
reviewRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, reviewController.updateReview);
reviewRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, reviewController.deleteReview);
exports.default = reviewRouter;

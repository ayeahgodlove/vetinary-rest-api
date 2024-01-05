"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/review-routes.ts
const express_1 = require("express");
const product_review_controller_1 = require("../controllers/product-review.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const productReviewController = new product_review_controller_1.ProductReviewsController();
const productReviewRouter = (0, express_1.Router)();
productReviewRouter.get("", productReviewController.getAll);
productReviewRouter.get("/:id", productReviewController.getReviewById);
productReviewRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, productReviewController.createReview);
productReviewRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, productReviewController.updateReview);
productReviewRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, productReviewController.deleteReview);
exports.default = productReviewRouter;

// src/infrastructure/routes/review-routes.ts
import { Router } from "express";
import { ProductReviewsController } from "../controllers/product-review.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const productReviewController = new ProductReviewsController();

const productReviewRouter = Router();

productReviewRouter.get("", productReviewController.getAll);
productReviewRouter.get("/:id", productReviewController.getReviewById);
productReviewRouter.post("", isAuthenticatedMiddleware, productReviewController.createReview);
productReviewRouter.put("/:id", isAuthenticatedMiddleware, productReviewController.updateReview);
productReviewRouter.delete("/:id", isAuthenticatedMiddleware, productReviewController.deleteReview);

export default productReviewRouter;

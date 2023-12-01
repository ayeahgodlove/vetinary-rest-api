"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/comment-routes.ts
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const commentController = new comment_controller_1.CommentsController();
const commentRouter = (0, express_1.Router)();
commentRouter.get("/:postId", commentController.getPostComments);
// commentRouter.get("/:id", isAuthenticatedMiddleware, commentController.getCommentById);
commentRouter.post("/", is_authenticated_middleware_1.isAuthenticatedMiddleware, commentController.createComment); //create comment
commentRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, commentController.updateComment);
commentRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, commentController.deleteComment);
exports.default = commentRouter;

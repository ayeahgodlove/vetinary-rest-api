"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/lesson-routes.ts
const express_1 = require("express");
const is_authenticated_middleware_1 = require("../../../shared/middlewares/is-authenticated.middleware");
const lesson_controller_1 = require("../../controllers/lms/lesson.controller");
const lessonController = new lesson_controller_1.LessonsController();
const lessonRouter = (0, express_1.Router)();
lessonRouter.get("", lessonController.getAll);
lessonRouter.get("/:id", lessonController.getLessonById);
lessonRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, lessonController.createLesson);
lessonRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, lessonController.updateLesson);
lessonRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, lessonController.deleteLesson);
exports.default = lessonRouter;

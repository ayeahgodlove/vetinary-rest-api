"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/quiz-routes.ts
const express_1 = require("express");
const is_authenticated_middleware_1 = require("../../../shared/middlewares/is-authenticated.middleware");
const quiz_controller_1 = require("../../controllers/lms/quiz.controller");
const quizController = new quiz_controller_1.QuizesController();
const quizRouter = (0, express_1.Router)();
quizRouter.get("", quizController.getAll);
quizRouter.get("/:id", quizController.getQuizById);
quizRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, quizController.createQuiz);
quizRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, quizController.updateQuiz);
quizRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, quizController.deleteQuiz);
exports.default = quizRouter;

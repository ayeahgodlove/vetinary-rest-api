// src/infrastructure/routes/quiz-routes.ts
import { Router } from "express";
import { isAuthenticatedMiddleware } from "../../../shared/middlewares/is-authenticated.middleware";
import { QuizesController } from "../../controllers/lms/quiz.controller";

const quizController = new QuizesController();

const quizRouter = Router();

quizRouter.get("", quizController.getAll);
quizRouter.get("/:id", quizController.getQuizById);
quizRouter.post("", isAuthenticatedMiddleware, quizController.createQuiz);
quizRouter.put("/:id", isAuthenticatedMiddleware, quizController.updateQuiz);
quizRouter.delete("/:id", isAuthenticatedMiddleware, quizController.deleteQuiz);

export default quizRouter;

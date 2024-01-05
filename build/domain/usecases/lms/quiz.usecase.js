"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizUseCase = void 0;
class QuizUseCase {
    quizRepository;
    /**
     *
     */
    constructor(quizRepository) {
        this.quizRepository = quizRepository;
    }
    async createQuiz(quiz) {
        const existingQuiz = await this.quizRepository.findByName(quiz.question);
        if (existingQuiz) {
            throw new Error("Quiz already exists");
        }
        // const _quiz = new Quiz({quiz});
        //because it's already done in the Repository
        return this.quizRepository.create(quiz);
    }
    async getAll() {
        return this.quizRepository.getAll();
    }
    async getQuizById(id) {
        return this.quizRepository.findById(id);
    }
    async updateQuiz(quiz) {
        return this.quizRepository.update(quiz);
    }
    async deleteQuiz(id) {
        return this.quizRepository.delete(id);
    }
}
exports.QuizUseCase = QuizUseCase;

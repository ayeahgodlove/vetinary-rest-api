"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRepository = void 0;
const not_found_exception_1 = require("../../../../shared/exceptions/not-found.exception");
const quiz_1 = require("../../../entities/lms/quiz");
class QuizRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Quiz as parameter
     * @quiz
     * returns void
     */
    async create(quiz) {
        try {
            return await quiz_1.Quiz.create({ ...quiz });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Quiz
     */
    async findById(id) {
        try {
            const quizItem = await quiz_1.Quiz.findByPk(id);
            if (!quizItem) {
                throw new not_found_exception_1.NotFoundException("Quiz", id);
            }
            return quizItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Quiz
     */
    async findByName(question) {
        try {
            const quizItem = await quiz_1.Quiz.findOne({ where: { question } });
            return quizItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Quiz
     */
    async getAll() {
        try {
            const categories = await quiz_1.Quiz.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Quiz as parameter
     * @quiz
     * returns void
     */
    async update(quiz) {
        const { id } = quiz;
        try {
            const quizItem = await quiz_1.Quiz.findByPk(id);
            console.log(quiz);
            if (!quizItem) {
                throw new not_found_exception_1.NotFoundException("Quiz", id.toString());
            }
            return await quizItem.update({ ...quiz });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const quizItem = await quiz_1.Quiz.findByPk(id);
            if (!quizItem) {
                throw new not_found_exception_1.NotFoundException("Quiz", id);
            }
            await quizItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.QuizRepository = QuizRepository;

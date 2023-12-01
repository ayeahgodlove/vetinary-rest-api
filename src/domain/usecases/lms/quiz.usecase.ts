import { IRepository } from "../../../data/repositories/contracts/repository.base";
import { IQuiz } from "../../models/lms/quiz";
import { Quiz } from "../../../data/entities/lms/quiz";
export class QuizUseCase {
  /**
   *
   */
  constructor(
    private readonly quizRepository: IRepository<IQuiz, Quiz>
  ) {}

  async createQuiz(quiz: IQuiz): Promise<Quiz> {
    const existingQuiz = await this.quizRepository.findByName(quiz.question);

    if (existingQuiz) {
      throw new Error("Quiz already exists");
    }

    // const _quiz = new Quiz({quiz});
    //because it's already done in the Repository
    return this.quizRepository.create(quiz);
  }

  async getAll(): Promise<Quiz[]> {
    return this.quizRepository.getAll();
  }

  async getQuizById(id: string): Promise<Quiz | null> {
    return this.quizRepository.findById(id);
  }

  async updateQuiz(quiz: IQuiz): Promise<Quiz> {
    return this.quizRepository.update(quiz);
  }

  async deleteQuiz(id: string): Promise<void> {
    return this.quizRepository.delete(id);
  }
}

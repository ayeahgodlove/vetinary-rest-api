import { LessonReview } from "../../data/entities/lesson-review";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { ILessonReview } from "../models/lesson-review";

export class LessonReviewUseCase {
  /**
   *
   */
  constructor(
    private readonly lessonReviewRepository: IRepository<
      ILessonReview,
      LessonReview
    >
  ) {}

  async createLessonReview(lessonReview: ILessonReview): Promise<LessonReview> {
    return this.lessonReviewRepository.create(lessonReview);
  }

  async getAll(): Promise<LessonReview[]> {
    return this.lessonReviewRepository.getAll();
  }

  async getLessonReviewById(id: string): Promise<LessonReview | null> {
    return this.lessonReviewRepository.findById(id);
  }

  async updateLessonReview(lessonReview: ILessonReview): Promise<LessonReview> {
    const obj: ILessonReview = {
      ...lessonReview,
      updatedAt: new Date(),
    };
    return this.lessonReviewRepository.update(obj);
  }

  async deleteLessonReview(id: string): Promise<void> {
    return this.lessonReviewRepository.delete(id);
  }
}

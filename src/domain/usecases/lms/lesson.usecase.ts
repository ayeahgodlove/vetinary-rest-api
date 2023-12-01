import { IRepository } from "../../../data/repositories/contracts/repository.base";
import { ILesson } from "../../models/lms/lesson";
import { Lesson } from "../../../data/entities/lms/lesson";
export class LessonUseCase {
  /**
   *
   */
  constructor(
    private readonly lessonRepository: IRepository<ILesson, Lesson>
  ) {}

  async createLesson(lesson: ILesson): Promise<Lesson> {
    const existingLesson = await this.lessonRepository.findByName(lesson.title);

    if (existingLesson) {
      throw new Error("Lesson already exists");
    }

    // const _lesson = new Lesson({lesson});
    //because it's already done in the Repository
    return this.lessonRepository.create(lesson);
  }

  async getAll(): Promise<Lesson[]> {
    return this.lessonRepository.getAll();
  }

  async getLessonById(id: string): Promise<Lesson | null> {
    return this.lessonRepository.findById(id);
  }

  async updateLesson(lesson: ILesson): Promise<Lesson> {
    return this.lessonRepository.update(lesson);
  }

  async deleteLesson(id: string): Promise<void> {
    return this.lessonRepository.delete(id);
  }
}

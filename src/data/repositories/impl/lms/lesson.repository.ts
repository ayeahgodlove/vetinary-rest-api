import { ILesson } from "../../../../domain/models/lms/lesson";
import { NotFoundException } from "../../../../shared/exceptions/not-found.exception";
import { Lesson } from "../../../entities/lms/lesson";
import { IRepository } from "../../contracts/repository.base";

export class LessonRepository implements IRepository<ILesson, Lesson> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Lesson as parameter
   * @lesson
   * returns void
   */
  async create(lesson: ILesson): Promise<Lesson> {
    try {
      return await Lesson.create<Lesson>({ ...lesson });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Lesson
   */
  async findById(id: string): Promise<Lesson | null> {
    try {
      const lessonItem = await Lesson.findByPk(id);

      if (!lessonItem) {
        throw new NotFoundException("Lesson", id);
      }
      return lessonItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Lesson
   */
  async findByName(title: string): Promise<Lesson | null> {
    try {
      const lessonItem = await Lesson.findOne({ where: { title } });
      return lessonItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Lesson
   */
  async getAll(): Promise<Lesson[]> {
    try {
      const categories = await Lesson.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Lesson as parameter
   * @lesson
   * returns void
   */
  async update(lesson: ILesson): Promise<Lesson> {
    const { id } = lesson;
    try {
      const lessonItem: any = await Lesson.findByPk(id);

      console.log(lesson);
      if (!lessonItem) {
        throw new NotFoundException("Lesson", id.toString());
      }

      return await lessonItem.update({ ...lesson });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const lessonItem = await Lesson.findByPk(id);

      if (!lessonItem) {
        throw new NotFoundException("Lesson", id);
      }

      await lessonItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

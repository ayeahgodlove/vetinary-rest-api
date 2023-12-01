import { LessonReview } from "../../entities/lesson-review";
import { ILessonReview } from "../../../domain/models/lesson-review";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";
import { User } from "../../entities/user";

export class LessonReviewRepository implements IRepository<ILessonReview, LessonReview> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a LessonReview as parameter
   * @lessonReview
   * returns void
   */
  async create(lessonReview: ILessonReview): Promise<LessonReview> {
    try {
      return await LessonReview.create<LessonReview>({ ...lessonReview });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns LessonReview
   */
  async findById(id: string): Promise<LessonReview | null> {
    try {
      const lessonReviewItem = await LessonReview.findByPk(id);

      if (!lessonReviewItem) {
        throw new NotFoundException("LessonReview", id);
      }
      return lessonReviewItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns LessonReview
   */
  async findByName(name: string): Promise<LessonReview | null> {
    try {
      const lessonReviewItem = await LessonReview.findOne({ include: [User] });
      return lessonReviewItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of LessonReview
   */
  async getAll(): Promise<LessonReview[]> {
    try {
      const lessonReviews = await LessonReview.findAll();
      return lessonReviews;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a LessonReview as parameter
   * @lessonReview
   * returns void
   */
  async update(lessonReview: ILessonReview): Promise<LessonReview> {
    const { id } = lessonReview;
    try {
      const lessonReviewItem: any = await LessonReview.findByPk(id);

      console.log(lessonReview);
      if (!lessonReviewItem) {
        throw new NotFoundException("LessonReview", id.toString());
      }

      return await lessonReviewItem.update({ ...lessonReview });
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
      const lessonReviewItem = await LessonReview.findByPk(id);

      if (!lessonReviewItem) {
        throw new NotFoundException("LessonReview", id);
      }

      await lessonReviewItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

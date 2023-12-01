import { ICourse } from "../../../../domain/models/lms/course";
import { NotFoundException } from "../../../../shared/exceptions/not-found.exception";
import { Course } from "../../../entities/lms/course";
import { IRepository } from "../../contracts/repository.base";

export class CourseRepository implements IRepository<ICourse, Course> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Course as parameter
   * @course
   * returns void
   */
  async create(course: ICourse): Promise<Course> {
    try {
      return await Course.create<Course>({ ...course });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Course
   */
  async findById(id: string): Promise<Course | null> {
    try {
      const courseItem = await Course.findByPk(id);

      if (!courseItem) {
        throw new NotFoundException("Course", id);
      }
      return courseItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Course
   */
  async findByName(title: string): Promise<Course | null> {
    try {
      const courseItem = await Course.findOne({ where: { title } });
      return courseItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Course
   */
  async getAll(): Promise<Course[]> {
    try {
      const categories = await Course.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Course as parameter
   * @course
   * returns void
   */
  async update(course: ICourse): Promise<Course> {
    const { id } = course;
    try {
      const courseItem: any = await Course.findByPk(id);

      console.log(course);
      if (!courseItem) {
        throw new NotFoundException("Course", id.toString());
      }

      return await courseItem.update({ ...course });
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
      const courseItem = await Course.findByPk(id);

      if (!courseItem) {
        throw new NotFoundException("Course", id);
      }

      await courseItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

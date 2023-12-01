import { IRepository } from "../../../data/repositories/contracts/repository.base";
import { ICourse } from "../../models/lms/course";
import { Course } from "../../../data/entities/lms/course";
export class CourseUseCase {
  /**
   *
   */
  constructor(
    private readonly courseRepository: IRepository<ICourse, Course>
  ) {}

  async createCourse(course: ICourse): Promise<Course> {
    const existingCourse = await this.courseRepository.findByName(course.title);

    if (existingCourse) {
      throw new Error("Course already exists");
    }

    // const _course = new Course({course});
    //because it's already done in the Repository
    return this.courseRepository.create(course);
  }

  async getAll(): Promise<Course[]> {
    return this.courseRepository.getAll();
  }

  async getCourseById(id: string): Promise<Course | null> {
    return this.courseRepository.findById(id);
  }

  async updateCourse(course: ICourse): Promise<Course> {
    return this.courseRepository.update(course);
  }

  async deleteCourse(id: string): Promise<void> {
    return this.courseRepository.delete(id);
  }
}

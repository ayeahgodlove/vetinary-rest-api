import { Request, Response } from "express";
import { CourseRepository } from "../../../data/repositories/impl/lms/course.repository";
import { CourseUseCase } from "../../../domain/usecases/lms/course.usecase";
import { CourseMapper } from "../../mappers/mapper";
import { CourseRequestDto } from "../../dtos/lms/course-request.dto";
import { displayValidationErrors } from "../../../utils/displayValidationErrors";
import {
  ICourse,
  ICourseResponse,
  emptyCourse,
} from "../../../domain/models/lms/course";
import { validate } from "class-validator";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

const courseRepository = new CourseRepository();
const courseUseCase = new CourseUseCase(courseRepository);
const courseMapper = new CourseMapper();

export class CoursesController {
  async createCourse(
    req: Request,
    res: Response<ICourseResponse>
  ): Promise<void> {
    const dto = new CourseRequestDto(req.body);
    const validationErrors = await validate(dto);

    const { filename } = req.file as Express.Multer.File;

    if (filename === undefined) {
      throw new Error("Photo not found!");
    }

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const courseResponse = await courseUseCase.createCourse({
          ...dto.toData(),
          courseImage: filename.toString(),
          completionDate: req.body.completionDate,
          startDate: req.body.startDate
        });

        res.status(201).json({
          data: courseResponse.toJSON<ICourse>(),
          message: "Course created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  }

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const courses = await courseUseCase.getAll();
      const coursesDTO = courseMapper.toDTOs(courses);

      res.json({
        data: coursesDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getCourseById(
    req: Request,
    res: Response<ICourseResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const course = await courseUseCase.getCourseById(id);
      if (!course) {
        throw new NotFoundException("Course", id);
      }
      const courseDTO = courseMapper.toDTO(course);
      res.json({
        data: courseDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateCourse(
    req: Request,
    res: Response<ICourseResponse>
  ): Promise<void> {
    const dto = new CourseRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const id = req.params.id;

        const obj: ICourse = {
          ...emptyCourse,
          ...req.body,
          id: id,
        };
        const updatedCourse = await courseUseCase.updateCourse(obj);
        const courseDto = courseMapper.toDTO(updatedCourse);

        res.json({
          data: courseDto,
          message: "Course Updated Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteCourse(
    req: Request,
    res: Response<ICourseResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await courseUseCase.deleteCourse(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      });
    }
  }
}

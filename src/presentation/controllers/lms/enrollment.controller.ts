import { Request, Response } from "express";
import { EnrollmentRepository } from "../../../data/repositories/impl/lms/enrollment.repository";
import { EnrollmentUseCase } from "../../../domain/usecases/lms/enrollment.usecase";
import { EnrollmentMapper } from "../../mappers/mapper";
import { EnrollmentRequestDto } from "../../dtos/lms/enrollment-request.dto";
import { displayValidationErrors } from "../../../utils/displayValidationErrors";
import {
  IEnrollment,
  IEnrollmentResponse,
  emptyEnrollment,
} from "../../../domain/models/lms/enrollment";
import { validate } from "class-validator";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

const enrollmentRepository = new EnrollmentRepository();
const enrollmentUseCase = new EnrollmentUseCase(enrollmentRepository);
const enrollmentMapper = new EnrollmentMapper();

export class EnrollmentsController {
  async createEnrollment(
    req: Request,
    res: Response<IEnrollmentResponse>
  ): Promise<void> {
    const dto = new EnrollmentRequestDto(req.body);
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
        const enrollmentResponse = await enrollmentUseCase.createEnrollment({
          ...dto.toData(),
          completionDate: req.body.completionDate,
          enrollmentDate: req.body.enrollmentDate,
        });

        res.status(201).json({
          data: enrollmentResponse.toJSON<IEnrollment>(),
          message: "Enrollment created Successfully!",
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
      const enrollments = await enrollmentUseCase.getAll();
      const enrollmentsDTO = enrollmentMapper.toDTOs(enrollments);

      res.json({
        data: enrollmentsDTO,
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

  async getEnrollmentById(
    req: Request,
    res: Response<IEnrollmentResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const enrollment = await enrollmentUseCase.getEnrollmentById(id);
      if (!enrollment) {
        throw new NotFoundException("Enrollment", id);
      }
      const enrollmentDTO = enrollmentMapper.toDTO(enrollment);
      res.json({
        data: enrollmentDTO,
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

  async updateEnrollment(
    req: Request,
    res: Response<IEnrollmentResponse>
  ): Promise<void> {
    const dto = new EnrollmentRequestDto(req.body);
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

        const obj: IEnrollment = {
          ...emptyEnrollment,
          ...req.body,
          id: id,
        };
        const updatedEnrollment = await enrollmentUseCase.updateEnrollment(obj);
        const enrollmentDto = enrollmentMapper.toDTO(updatedEnrollment);

        res.json({
          data: enrollmentDto,
          message: "Enrollment Updated Successfully!",
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

  async deleteEnrollment(
    req: Request,
    res: Response<IEnrollmentResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await enrollmentUseCase.deleteEnrollment(id);

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

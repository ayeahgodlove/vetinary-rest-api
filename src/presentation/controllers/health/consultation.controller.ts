import { Request, Response } from "express";

import { validate } from "class-validator";
import { ConsultationRepository } from "../../../data/repositories/impl/health/consultation.repository";
import { displayValidationErrors } from "../../../utils/displayValidationErrors";
import { ConsultationUseCase } from "../../../domain/usecases/health/consultation.usecase";
import { ConsultationMapper } from "../../mappers/mapper";
import {
  IConsultation,
  IConsultationResponse,
  emptyConsultation,
} from "../../../domain/models/health/consultation";
import { ConsultationRequestDto } from "../../dtos/health/consultation-request.dto";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

const consultationRepository = new ConsultationRepository();
const consultationUseCase = new ConsultationUseCase(consultationRepository);
const consultationMapper = new ConsultationMapper();

export class ConsultationsController {
  async createConsultation(
    req: Request,
    res: Response<IConsultationResponse>
  ): Promise<void> {
    const dto = new ConsultationRequestDto(req.body);
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
        const consultationResponse =
          await consultationUseCase.createConsultation(dto.toData());

        res.status(201).json({
          data: consultationResponse.toJSON<IConsultation>(),
          message: "Consultation created Successfully!",
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
      const consultationes = await consultationUseCase.getAll();
      const consultationesDTO = consultationMapper.toDTOs(consultationes);

      res.json({
        data: consultationesDTO,
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

  async getConsultationById(
    req: Request,
    res: Response<IConsultationResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const consultation = await consultationUseCase.getConsultationById(id);
      if (!consultation) {
        throw new NotFoundException("Consultation", id);
      }
      const consultationDTO = consultationMapper.toDTO(consultation);
      res.json({
        data: consultationDTO,
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

  async updateConsultation(
    req: Request,
    res: Response<IConsultationResponse>
  ): Promise<void> {
    const dto = new ConsultationRequestDto(req.body);
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

        const obj: IConsultation = {
          ...emptyConsultation,
          ...req.body,
          id: id,
        };
        const updatedConsultation =
          await consultationUseCase.updateConsultation(obj);
        const consultationDto = consultationMapper.toDTO(updatedConsultation);

        res.json({
          data: consultationDto,
          message: "Consultation Updated Successfully!",
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

  async deleteConsultation(
    req: Request,
    res: Response<IConsultationResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await consultationUseCase.deleteConsultation(id);

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

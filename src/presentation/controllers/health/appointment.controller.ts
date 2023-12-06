import { Request, Response } from "express";

import { validate } from "class-validator";
import { AppointmentRepository } from "../../../data/repositories/impl/health/appointment.repository";
import { AppointmentUseCase } from "../../../domain/usecases/health/appointment.usecase";
import { AppointmentMapper } from "../../mappers/mapper";
import { AppointmentRequestDto } from "../../dtos/health/appointment-request.dto";
import { displayValidationErrors } from "../../../utils/displayValidationErrors";
import {
  IAppointment,
  IAppointmentResponse,
  emptyAppointment,
} from "../../../domain/models/health/appointment";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

const appointmentRepository = new AppointmentRepository();
const appointmentUseCase = new AppointmentUseCase(appointmentRepository);
const appointmentMapper = new AppointmentMapper();

export class AppointmentsController {
  async createAppointment(
    req: Request,
    res: Response<IAppointmentResponse>
  ): Promise<void> {
    const dto = new AppointmentRequestDto(req.body);
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
        const appointmentResponse = await appointmentUseCase.createAppointment(
          dto.toData()
        );

        res.status(201).json({
          data: appointmentResponse.toJSON<IAppointment>(),
          message: "Appointment created Successfully!",
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
      const appointmentes = await appointmentUseCase.getAll();
      const appointmentesDTO = appointmentMapper.toDTOs(appointmentes);

      res.json({
        data: appointmentesDTO,
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

  async getAppointmentById(
    req: Request,
    res: Response<IAppointmentResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const appointment = await appointmentUseCase.getAppointmentById(id);
      if (!appointment) {
        throw new NotFoundException("Appointment", id);
      }
      const appointmentDTO = appointmentMapper.toDTO(appointment);
      res.json({
        data: appointmentDTO,
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

  async updateAppointment(
    req: Request,
    res: Response<IAppointmentResponse>
  ): Promise<void> {
    const dto = new AppointmentRequestDto(req.body);
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

        const obj: IAppointment = {
          ...emptyAppointment,
          ...req.body,
          id: id,
        };
        const updatedAppointment = await appointmentUseCase.updateAppointment(
          obj
        );
        const appointmentDto = appointmentMapper.toDTO(updatedAppointment);

        res.json({
          data: appointmentDto,
          message: "Appointment Updated Successfully!",
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

  async deleteAppointment(
    req: Request,
    res: Response<IAppointmentResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await appointmentUseCase.deleteAppointment(id);

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

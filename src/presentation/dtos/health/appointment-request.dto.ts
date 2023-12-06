// src/presentation/dtos/appointment-request.dto.ts

import {  IsNotEmpty, IsString } from "class-validator";
import { nanoid } from "nanoid";
import { IAppointment, emptyAppointment } from "../../../domain/models/health/appointment";


export class AppointmentRequestDto {
  @IsNotEmpty()
  @IsString()
  petOwnerId: string;

  @IsNotEmpty()
  @IsString()
  vetDoctorId: string;

  constructor(data: IAppointment) {
    this.petOwnerId = data.petOwnerId;
    this.vetDoctorId = data.vetDoctorId;
  }

  toData(): IAppointment {
    return {
      ...emptyAppointment,
      id: nanoid(10),
      petOwnerId: this.petOwnerId,
      vetDoctorId: this.vetDoctorId,
    };
  }

  toUpdateData(data: IAppointment): IAppointment {
    return {
      id: data.id,
      petOwnerId: data.petOwnerId,
      vetDoctorId: data.vetDoctorId,
      appointmentDateTime: data.appointmentDateTime,
      durationMinutes: data.durationMinutes,
      isConfirmed: data.isConfirmed
    }
  }
}

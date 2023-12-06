// src/presentation/dtos/consultation-request.dto.ts

import { IsNotEmpty, IsString } from "class-validator";
import { nanoid } from "nanoid";
import {
  IConsultation,
  emptyConsultation,
} from "../../../domain/models/health/consultation";

export class ConsultationRequestDto {
  @IsNotEmpty()
  @IsString()
  petOwnerId: string;

  @IsNotEmpty()
  @IsString()
  vetDoctorId: string;

  @IsNotEmpty()
  @IsString()
  diagnosis: string;

  constructor(data: IConsultation) {
    this.petOwnerId = data.petOwnerId;
    this.vetDoctorId = data.vetDoctorId;
    this.diagnosis = data.diagnosis;
  }

  toData(): IConsultation {
    return {
      ...emptyConsultation,
      id: nanoid(10),
      petOwnerId: this.petOwnerId,
      vetDoctorId: this.vetDoctorId,
      diagnosis: this.diagnosis,
    };
  }

  toUpdateData(data: IConsultation): IConsultation {
    return {
      id: data.id,
      petOwnerId: data.petOwnerId,
      vetDoctorId: data.vetDoctorId,
      diagnosis: data.diagnosis,
      endDate: data.endDate,
      startDate: data.startDate,
    };
  }
}

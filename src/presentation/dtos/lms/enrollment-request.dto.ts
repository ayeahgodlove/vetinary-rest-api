// src/presentation/dtos/enrollment-request.dto.ts

import { IsNotEmpty, IsString, IsDate } from "class-validator";
import { nanoid } from "nanoid";
import {
  IEnrollment,
  emptyEnrollment,
} from "../../../domain/models/lms/enrollment";

export class EnrollmentRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  courseId: string;

  // @IsNotEmpty()
  // @IsDate()
  // completionDate: Date;

  // @IsNotEmpty()
  // @IsDate()
  // enrollmentDate: Date;

  constructor(data: IEnrollment) {
    this.userId = data.userId;
    this.courseId = data.courseId;
    // this.completionDate = data.completionDate;
    // this.enrollmentDate = data.enrollmentDate;
  }

  toData(): IEnrollment {
    return {
      ...emptyEnrollment,
      id: nanoid(10),
      userId: this.userId,
      courseId: this.courseId,
      // completionDate: this.completionDate,
      // enrollmentDate: this.enrollmentDate,
    };
  }

  toUpdateData(data: IEnrollment): IEnrollment {
    return {
      id: data.id,
      userId: data.userId,
      courseId: data.courseId,
      completionDate: data.completionDate,
      enrollmentDate: data.enrollmentDate,
    };
  }
}

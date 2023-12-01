import { IBaseResponse } from "../base-response";

export interface IEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentDate: Date;
  completionDate: Date;
}

export const emptyEnrollment: IEnrollment = {
  id: "",
  userId: "",
  courseId: "",
  enrollmentDate: new Date(),
  completionDate: new Date(),
};

export interface IEnrollmentResponse extends IBaseResponse {
  data: IEnrollment | null | IEnrollment[];
}

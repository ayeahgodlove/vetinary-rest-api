import { IBaseResponse } from "../base-response";

export interface IAppointment {
  id: string;
  petOwnerId: string;
  vetDoctorId: string;
  appointmentDateTime: Date;
  durationMinutes: number;
  isConfirmed: boolean;
}

export const emptyAppointment: IAppointment = {
  id: "",
  petOwnerId: "",
  vetDoctorId: "",
  appointmentDateTime: new Date(),
  durationMinutes: 0,
  isConfirmed: false,
};

export interface IAppointmentResponse extends IBaseResponse {
  data: IAppointment | null | IAppointment[];
}

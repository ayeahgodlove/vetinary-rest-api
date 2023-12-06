import { IBaseResponse } from "../base-response";

export interface IConsultation {
  id: string;
  startDate: Date;
  endDate: Date;
  diagnosis: string;
  petOwnerId: string
  vetDoctorId: string
}

export const emptyConsultation: IConsultation = {
    id: "",
    startDate: new Date(),
    endDate: new Date(),
    diagnosis: "",
    petOwnerId: "",
    vetDoctorId: ""
};

export interface IConsultationResponse extends IBaseResponse {
  data: IConsultation | null | IConsultation[];
}

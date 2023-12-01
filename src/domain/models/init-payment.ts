import { IBaseResponse } from "./base-response";

export interface IInitPayment {
  amount: string;
  operator: string;
  telephone: string;
  name: string;
  email: string;
  address: string;
}

export const emptyInitPayment: IInitPayment = {
  amount: "",
  operator: "",
  telephone: "",
  name: "",
  email: "",
  address: "",
};

export interface IInitPaymentResponse extends IBaseResponse {
  data: IInitPayment | null | IInitPayment[];
}

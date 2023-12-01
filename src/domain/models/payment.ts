import { IBaseResponse } from "./base-response";

export interface IPayment {
  id: string;
  userId?: string;
  orderNo: string;
  email:string;
  username:string;
  cellPhone:string;
  address: string;
  amount: number;
  status: string;
} 

export const emptyPayment: IPayment = {
  id: "",
  amount: 0,
  status: "",
  orderNo: "",
  email: "",
  username: "",
  cellPhone: "",
  address: ""
};

export interface IPaymentResponse extends IBaseResponse {
  data: IPayment | null | IPayment[];
}

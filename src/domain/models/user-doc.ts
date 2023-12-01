import { IBaseResponse } from "./base-response";

export interface IUserDoc {
  id: string;
  userId: string;
  scannedIdCard: string;
  scannedLiscence: string;
}

export const emptyUserDoc: IUserDoc = {
  id: "",
  userId: "",
  scannedIdCard: "",
  scannedLiscence: "",
};

export interface IUserDocResponse extends IBaseResponse {
  data: IUserDoc | null | IUserDoc[];
}

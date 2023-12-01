import { IBaseResponse } from "./base-response";

export interface IUserStore {
  userId: string;
  storeId: string;
}

export const emptyUserStore: IUserStore = {
  userId: "",
  storeId: "",
};

export interface IUserStoreResponse extends IBaseResponse {
  data: IUserStore | null | IUserStore[];
}

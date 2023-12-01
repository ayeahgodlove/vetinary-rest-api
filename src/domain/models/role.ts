import { IBaseResponse } from "./base-response";

export interface IRole {
  id: string;
  name: string;
}

export const emptyRole: IRole = {
  id: "",
  name: "",
};

export interface IRoleResponse extends IBaseResponse {
  data: IRole | null | IRole[];
}

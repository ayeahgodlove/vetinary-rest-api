import { IBaseResponse } from "./base-response";

export interface IUserRole {
  userId: string;
  roleId: string;
}

export const emptyUserRole: IUserRole = {
  userId: "",
  roleId: "",
};

export interface IUserRoleResponse extends IBaseResponse {
  data: IUserRole | null | IUserRole[];
}

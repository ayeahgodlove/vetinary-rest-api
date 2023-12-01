import { Role } from "../../data/entities/role";
import { IBaseResponse } from "./base-response";
import { IRole } from "./role";

export interface IUser {
  id: string;
  authStrategy: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  city: string; //town
  country: string;
  address: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  roles?: Role[] | IRole[]
  token?: string
}

export const emptyUser: IUser = {
  id: "",
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  phoneNumber: "",
  city: "",
  country: "",
  address: "",
  password: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  avatar: "",
  authStrategy: "",
  verified: false,
};

export interface IUserResponse extends IBaseResponse {
  data: IUser | null | IUser[];
}

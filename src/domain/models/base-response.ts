import { ValidationError } from "class-validator";

export interface IBaseResponse {
  message: string | string[];
  success: boolean;
  validationErrors: string[] | ValidationError[];
}

export const emptyBase: IBaseResponse = {
  success: false,
  message: "",
  validationErrors: [],
};

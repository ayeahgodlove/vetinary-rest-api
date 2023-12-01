import { IBaseResponse } from "./base-response";

export interface ISubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const emptySubCategory: ISubCategory = {
  id: "",
  name: "",
  slug: "",
  description: ""
};

export interface ISubCategoryResponse extends IBaseResponse {
  data: ISubCategory | null | ISubCategory[];
}

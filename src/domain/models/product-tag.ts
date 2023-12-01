import { IBaseResponse } from "./base-response";

export interface IProductTag {
  tagId: string;
  productId: string,
}

export const emptyProductTag: IProductTag = {
  tagId: "",
  productId: ""
};

export interface IProductTagResponse extends IBaseResponse {
  data: IProductTag | null | IProductTag[];
}

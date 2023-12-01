import { IBaseResponse } from "./base-response";

export interface IProductImage {
  id: string;
  productName: string;
  productId: string;
  imageUrl: string;
}

export const emptyProductImage: IProductImage = {
  id: "",
  productId: "",
  imageUrl: "",
  productName: ""
};

export interface IProductImageResponse extends IBaseResponse {
  data: IProductImage | null | IProductImage[];
}

import { IBaseResponse } from "./base-response";

export interface IProductOrder {
  orderId: string;
  productId: string,
}

export const emptyProductOrder: IProductOrder = {
  orderId: "",
  productId: ""
};

export interface IProductOrderResponse extends IBaseResponse {
  data: IProductOrder | null | IProductOrder[];
}

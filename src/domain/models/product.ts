import { IBaseResponse } from "./base-response";
import { IOrder } from "./order";
import { IProductImage } from "./product-image";
import { IReview } from "./lesson-review";
import { ITag } from "./tag";

export interface IProduct {
  id: string;
  name: string;
  amount: number;
  description: string;
  categoryId: string;
  shortDescription: string;
  storeId: string;
  productImages: IProductImage[];
  qtty: number;
  reviews: IReview[]
  tags: ITag[]
  orders: IOrder[]
}

export const emptyProduct: IProduct = {
  id: "",
  name: "",
  amount: 0,
  description: "",
  categoryId: "",
  productImages: [],
  shortDescription: "",
  storeId: "",
  qtty: 0,
  reviews: [],
  tags: [],
  orders: []
};

export interface IProductResponse extends IBaseResponse {
  data: IProduct | null | IProduct[];
}

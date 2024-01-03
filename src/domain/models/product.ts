import { IBaseResponse } from "./base-response";
import { IOrder } from "./order";
import { ILessonReview } from "./lesson-review";
import { ITag } from "./tag";

export interface IProduct {
  id: string;
  name: string;
  amount: number;
  description: string;
  categoryId: string;
  shortDescription: string;
  storeId: string;
  productImages: string[];
  qtty: number;
  reviews: ILessonReview[]
  tags: string[]
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

import { IBaseResponse } from "./base-response";

export interface IBanner {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  userId: string
}

export const emptyBanner: IBanner = {
  id: "",
  title: "",
  subTitle: "",
  image: "",
  userId: ""
};

export interface IBannerResponse extends IBaseResponse {
  data: IBanner | null | IBanner[];
}

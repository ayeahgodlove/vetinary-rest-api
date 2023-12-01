import { IBaseResponse } from "./base-response";

export interface IStore {
  id: string;
  name: string;
  location: string;
  imageBannerUrl: string;
  userId: string;
}

export const emptyStore: IStore = {
  id: "",
  name: "",
  location: "",
  imageBannerUrl: "",
  userId: ""
};

export interface IStoreResponse extends IBaseResponse {
  data: IStore | null | IStore[];
}

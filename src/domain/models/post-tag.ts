import { IBaseResponse } from "./base-response";

export interface IPostTag {
  postId: string;
  tagId: string;
}

export const emptyPostTag: IPostTag = {
  postId: "",
  tagId: ""
};

export interface IPostTagResponse extends IBaseResponse {
  data: IPostTag | null | IPostTag[];
}

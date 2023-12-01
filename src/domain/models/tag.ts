import { IBaseResponse } from "./base-response";

export interface ITag {
  id: string;
  name: string;

}

export const emptyTag: ITag = {
  id: "",
  name: "",
};

export interface ITagResponse extends IBaseResponse {
  data: ITag | null | ITag[];
}

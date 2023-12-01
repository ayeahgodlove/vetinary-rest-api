import { IBaseResponse } from "./base-response";

export interface IDocumentTag {
  documentId: string;
  tagId: string;
}

export const emptyDocumentTag: IDocumentTag = {
  documentId: "",
  tagId: ""
};

export interface IDocumentTagResponse extends IBaseResponse {
  data: IDocumentTag | null | IDocumentTag[];
}

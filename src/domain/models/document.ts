import { IBaseResponse } from "./base-response";

export interface IDocument {
  id: string; //primary key
  title: string;
  description: string;
  fileUrl: string;
  slug: string;
  userId: string; //foreign key to user
  categoryId: string; //foreign key to category
  uploadDate: Date;
}

export const emptyDocument: IDocument = {
  id: "",
  title: "",
  slug: "",
  description: "",
  fileUrl: "",
  userId: "",
  categoryId: "",
  uploadDate: new Date()
};

export interface IDocumentResponse extends IBaseResponse {
  data: IDocument | null | IDocument[];
}

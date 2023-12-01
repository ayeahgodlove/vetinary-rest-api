import { IBaseResponse } from "./base-response";

export interface IPost {
  id: string; //primary key
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  publishedAt: Date;
  authorId: string; //foreign key to user table
  categoryId: string; //foreign key to user table
}

export const emptyPost: IPost = {
  id: "",
  slug: "",
  title: "",
  content: "",
  imageUrl: "",
  publishedAt: new Date(),
  authorId: "",
  categoryId: ""
};

export interface IPostResponse extends IBaseResponse {
  data: IPost | null | IPost[];
}

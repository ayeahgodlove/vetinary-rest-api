import { IComment } from "../../../domain/models/comment";
import { IDocument } from "../../../domain/models/document";
import { IPost } from "../../../domain/models/post";
import { DocumentFile } from "../../entities/document";
import { Post } from "../../entities/post";
import { Comment } from "../../entities/comment";
import { Banner } from "../../entities/banner";
import { IBanner } from "../../../domain/models/banner";
import { IProduct } from "../../../domain/models/product";
import { Product } from "../../entities/product";
import { Tag } from "../../entities/tag";
import { IOrder } from "../../../domain/models/order";
import { Order } from "../../entities/order";
import { Payment } from "../../entities/payment";
import { IPayment } from "../../../domain/models/payment";

export interface IRepository<T, U> {
  create(category: T): Promise<U>;
  findById(id: string): Promise<U | null>;
  findByName(name: string): Promise<U | null>;
  getAll(): Promise<U[]>;
  update(category: T): Promise<U>;
  delete(id: string): Promise<void>;
}

export interface ICommentRepository {
  create(category: IComment): Promise<Comment>;
  getPostComments(postId: string): Promise<Comment[]>;
  update(category: IComment): Promise<Comment>;
  delete(id: string): Promise<void>;
}
export interface IDocumentRepository
  extends IRepository<IDocument, DocumentFile> {
  findByTitle(title: string): Promise<DocumentFile | null>;
}

export interface IProductRepository extends IRepository<IProduct, Product> {
  search(value: string): Promise<Product[]>;
  findByCategory(category: string): Promise<Product[]>;
}
export interface IPostRepository extends IRepository<IPost, Post> {
  findByTitle(title: string): Promise<Post | null>;
}
export interface IBannerRepository extends IRepository<IBanner, Banner> {
  findByTitle(title: string): Promise<Banner | null>;
}

export interface IOrderRepository extends IRepository<IOrder, Order> {
  findByOrderNo(orderNo: string): Promise<Order | null>;
}
export interface IPaymentRepository extends IRepository<IPayment, Payment> {
  findByOrderId(orderNo: string): Promise<Payment | null>;
}

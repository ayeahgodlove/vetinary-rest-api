import { ProductReview } from "../../data/entities/product-review";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IProductReview } from "../models/product-review";

export class ProductReviewUseCase {
  /**
   *
   */
  constructor(
    private readonly productReviewRepository: IRepository<IProductReview, ProductReview>
  ) {}

  async createProductReview(productReview: IProductReview): Promise<ProductReview> {
    return this.productReviewRepository.create(productReview);
  }

  async getAll(): Promise<ProductReview[]> {
    return this.productReviewRepository.getAll();
  }

  async getProductReviewById(id: string): Promise<ProductReview | null> {
    return this.productReviewRepository.findById(id);
  }

  async updateProductReview(productReview: IProductReview): Promise<ProductReview> {
    const obj: IProductReview = {
      ...productReview,
      updatedAt: new Date(),
    };
    return this.productReviewRepository.update(obj);
  }

  async deleteProductReview(id: string): Promise<void> {
    return this.productReviewRepository.delete(id);
  }
}

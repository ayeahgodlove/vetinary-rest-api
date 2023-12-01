import { ProductReview } from "../../entities/product-review";
import { IProductReview } from "../../../domain/models/product-review";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";
import { User } from "../../entities/user";

export class ProductReviewRepository
  implements IRepository<IProductReview, ProductReview>
{
  /**
   *
   */
  constructor() {}

  /**
   * Receives a ProductReview as parameter
   * @productReview
   * returns void
   */
  async create(productReview: IProductReview): Promise<ProductReview> {
    try {
      return await ProductReview.create<ProductReview>({ ...productReview });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns ProductReview
   */
  async findById(id: string): Promise<ProductReview | null> {
    try {
      const productReviewItem = await ProductReview.findByPk(id);

      if (!productReviewItem) {
        throw new NotFoundException("ProductReview", id);
      }
      return productReviewItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns ProductReview
   */
  async findByName(name: string): Promise<ProductReview | null> {
    try {
      const productReviewItem = await ProductReview.findOne({
        include: [User],
      });
      return productReviewItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of ProductReview
   */
  async getAll(): Promise<ProductReview[]> {
    try {
      const productReviews = await ProductReview.findAll();
      return productReviews;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a ProductReview as parameter
   * @productReview
   * returns void
   */
  async update(productReview: IProductReview): Promise<ProductReview> {
    const { id } = productReview;
    try {
      const productReviewItem: any = await ProductReview.findByPk(id);

      console.log(productReview);
      if (!productReviewItem) {
        throw new NotFoundException("ProductReview", id.toString());
      }

      return await productReviewItem.update({ ...productReview });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const productReviewItem = await ProductReview.findByPk(id);

      if (!productReviewItem) {
        throw new NotFoundException("ProductReview", id);
      }

      await productReviewItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

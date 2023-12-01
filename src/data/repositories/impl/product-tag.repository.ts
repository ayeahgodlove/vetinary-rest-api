import { ProductTag } from "../../entities/product-tag";
import { IProductTag } from "../../../domain/models/product-tag";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class ProductTagRepository
  implements IRepository<IProductTag, ProductTag>
{
  /**
   *
   */
  constructor() {}
  findByName(name: string): Promise<ProductTag | null> {
    throw new Error("Method not implemented.");
  }

  /**
   * Receives a ProductTag as parameter
   * @productTag
   * returns void
   */
  async create(productTag: IProductTag): Promise<ProductTag> {
    try {
      return await ProductTag.create<ProductTag>({ ...productTag });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns ProductTag
   */
  async findById(id: string): Promise<ProductTag | null> {
    try {
      const productTagItem = await ProductTag.findByPk(id);

      if (!productTagItem) {
        throw new NotFoundException("ProductTag", id);
      }
      return productTagItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of ProductTag
   */
  async getAll(): Promise<ProductTag[]> {
    try {
      const productTags = await ProductTag.findAll();
      return productTags;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a ProductTag as parameter
   * @productTag
   * returns void
   */
  async update(productTag: IProductTag): Promise<ProductTag> {
    const { productId } = productTag;
    try {
      const productTagItem: any = await ProductTag.findByPk(productId);

      console.log(productTag);
      if (!productTagItem) {
        throw new NotFoundException("ProductTag", productId.toString());
      }

      return await productTagItem.update({ ...productTag });
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
      const productTagItem = await ProductTag.findByPk(id);

      if (!productTagItem) {
        throw new NotFoundException("ProductTag", id);
      }

      await productTagItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

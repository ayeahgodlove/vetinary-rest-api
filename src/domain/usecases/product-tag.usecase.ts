import { ProductTag } from "../../data/entities/product-tag";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IProductTag } from "../models/product-tag";

export class ProductTagUseCase {
  /**
   *
   */
  constructor(private readonly productTagRepository: IRepository<IProductTag, ProductTag>) {}

  async createProductTag(productTag: IProductTag): Promise<ProductTag> {
    const existingProductTag = await this.productTagRepository.findById(
      productTag.productId
    );

    if (existingProductTag) {
      throw new Error("ProductTag already exists");
    }

    // const _productTag = new ProductTag({productTag});
    //because it's already done in the Repository
    return this.productTagRepository.create(productTag);
  }

  async getAll(): Promise<ProductTag[]> {
    return this.productTagRepository.getAll();
  }

  async getProductTagById(id: string): Promise<ProductTag | null> {
    return this.productTagRepository.findById(id);
  }

  async updateProductTag(productTag: IProductTag): Promise<ProductTag> {
    const {  productId, tagId } = productTag;
    const obj: IProductTag = {
      tagId,
      productId
    };
    return this.productTagRepository.update(obj);
  }

  async deleteProductTag(id: string): Promise<void> {
    return this.productTagRepository.delete(id);
  }
}
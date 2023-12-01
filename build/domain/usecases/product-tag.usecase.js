"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTagUseCase = void 0;
class ProductTagUseCase {
    productTagRepository;
    /**
     *
     */
    constructor(productTagRepository) {
        this.productTagRepository = productTagRepository;
    }
    async createProductTag(productTag) {
        const existingProductTag = await this.productTagRepository.findById(productTag.productId);
        if (existingProductTag) {
            throw new Error("ProductTag already exists");
        }
        // const _productTag = new ProductTag({productTag});
        //because it's already done in the Repository
        return this.productTagRepository.create(productTag);
    }
    async getAll() {
        return this.productTagRepository.getAll();
    }
    async getProductTagById(id) {
        return this.productTagRepository.findById(id);
    }
    async updateProductTag(productTag) {
        const { productId, tagId } = productTag;
        const obj = {
            tagId,
            productId
        };
        return this.productTagRepository.update(obj);
    }
    async deleteProductTag(id) {
        return this.productTagRepository.delete(id);
    }
}
exports.ProductTagUseCase = ProductTagUseCase;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTagRepository = void 0;
const product_tag_1 = require("../../entities/product-tag");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class ProductTagRepository {
    /**
     *
     */
    constructor() { }
    findByName(name) {
        throw new Error("Method not implemented.");
    }
    /**
     * Receives a ProductTag as parameter
     * @productTag
     * returns void
     */
    async create(productTag) {
        try {
            return await product_tag_1.ProductTag.create({ ...productTag });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns ProductTag
     */
    async findById(id) {
        try {
            const productTagItem = await product_tag_1.ProductTag.findByPk(id);
            if (!productTagItem) {
                throw new not_found_exception_1.NotFoundException("ProductTag", id);
            }
            return productTagItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of ProductTag
     */
    async getAll() {
        try {
            const productTags = await product_tag_1.ProductTag.findAll();
            return productTags;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a ProductTag as parameter
     * @productTag
     * returns void
     */
    async update(productTag) {
        const { productId } = productTag;
        try {
            const productTagItem = await product_tag_1.ProductTag.findByPk(productId);
            console.log(productTag);
            if (!productTagItem) {
                throw new not_found_exception_1.NotFoundException("ProductTag", productId.toString());
            }
            return await productTagItem.update({ ...productTag });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const productTagItem = await product_tag_1.ProductTag.findByPk(id);
            if (!productTagItem) {
                throw new not_found_exception_1.NotFoundException("ProductTag", id);
            }
            await productTagItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProductTagRepository = ProductTagRepository;

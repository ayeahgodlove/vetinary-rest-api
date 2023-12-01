"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageRepository = void 0;
const product_image_1 = require("../../entities/product-image");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class ProductImageRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a ProductImage as parameter
     * @productImage
     * returns void
     */
    async create(productImage) {
        try {
            return await product_image_1.ProductImage.create({ ...productImage });
        }
        catch (error) {
            throw error;
        }
    }
    async createMany(productImages) {
        try {
            return await product_image_1.ProductImage.bulkCreate(productImages, {
                include: ["product"],
            });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns ProductImage
     */
    async findById(id) {
        try {
            const productImageItem = await product_image_1.ProductImage.findByPk(id);
            if (!productImageItem) {
                throw new not_found_exception_1.NotFoundException("ProductImage", id);
            }
            return productImageItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns ProductImage
     */
    async findByName(name) {
        try {
            const productImageItem = await product_image_1.ProductImage.findOne({
                where: { productName: name },
            });
            return productImageItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of ProductImage
     */
    async getAll() {
        try {
            const productImages = await product_image_1.ProductImage.findAll();
            return productImages;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a ProductImage as parameter
     * @productImage
     * returns void
     */
    async update(productImage) {
        const { id } = productImage;
        try {
            const productImageItem = await product_image_1.ProductImage.findByPk(id);
            console.log(productImage);
            if (!productImageItem) {
                throw new not_found_exception_1.NotFoundException("ProductImage", id.toString());
            }
            return await productImageItem.update({ ...productImage });
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
            const productImageItem = await product_image_1.ProductImage.findByPk(id);
            if (!productImageItem) {
                throw new not_found_exception_1.NotFoundException("ProductImage", id);
            }
            await productImageItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProductImageRepository = ProductImageRepository;

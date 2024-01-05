"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const product_1 = require("../../entities/product");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const sequelize_1 = require("sequelize");
class ProductRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Product as parameter
     * @product
     * returns void
     */
    async create(product) {
        try {
            return await product_1.Product.create({ ...product });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Product
     */
    async findById(id) {
        try {
            const productItem = await product_1.Product.findByPk(id);
            if (!productItem) {
                throw new not_found_exception_1.NotFoundException("Product", id);
            }
            return productItem;
        }
        catch (error) {
            throw error;
        }
    }
    async findByCategory(category) {
        try {
            const products = await product_1.Product.findAll({
                where: {
                    categoryId: category,
                },
            });
            if (!products) {
                throw new not_found_exception_1.NotFoundException("Product", category);
            }
            return products;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Product
     */
    async findByName(name) {
        try {
            const productItem = await product_1.Product.findOne({ where: { name } });
            return productItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Product
     */
    async getAll() {
        try {
            const products = await product_1.Product.findAll();
            return products;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Product as parameter
     * @product
     * returns void
     */
    async update(product) {
        const { id } = product;
        try {
            const productItem = await product_1.Product.findByPk(id);
            console.log(product);
            if (!productItem) {
                throw new not_found_exception_1.NotFoundException("Product", id.toString());
            }
            return await productItem.update({ ...product });
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
            const productItem = await product_1.Product.findByPk(id);
            if (!productItem) {
                throw new not_found_exception_1.NotFoundException("Product", id);
            }
            await productItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * search values in the database
     * @value
     * returns array of Products
     */
    async search(value) {
        try {
            const products = await product_1.Product.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.like]: `%${value}%`,
                    },
                },
            });
            return products;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProductRepository = ProductRepository;

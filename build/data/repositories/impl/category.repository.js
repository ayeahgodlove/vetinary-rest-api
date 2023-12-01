"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const category_1 = require("../../entities/category");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class CategoryRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Category as parameter
     * @category
     * returns void
     */
    async create(category) {
        try {
            return await category_1.Category.create({ ...category });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Category
     */
    async findById(id) {
        try {
            const categoryItem = await category_1.Category.findByPk(id);
            if (!categoryItem) {
                throw new not_found_exception_1.NotFoundException("Category", id);
            }
            return categoryItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Category
     */
    async findByName(name) {
        try {
            const categoryItem = await category_1.Category.findOne({ where: { name } });
            return categoryItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Category
     */
    async getAll() {
        try {
            const categories = await category_1.Category.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Category as parameter
     * @category
     * returns void
     */
    async update(category) {
        const { id } = category;
        try {
            const categoryItem = await category_1.Category.findByPk(id);
            console.log(category);
            if (!categoryItem) {
                throw new not_found_exception_1.NotFoundException("Category", id.toString());
            }
            return await categoryItem.update({ ...category });
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
            const categoryItem = await category_1.Category.findByPk(id);
            if (!categoryItem) {
                throw new not_found_exception_1.NotFoundException("Category", id);
            }
            await categoryItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CategoryRepository = CategoryRepository;

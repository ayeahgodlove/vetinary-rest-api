"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryRepository = void 0;
const sub_category_1 = require("../../entities/sub-category");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class SubCategoryRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a SubCategory as parameter
     * @Subcategory
     * returns void
     */
    async create(Subcategory) {
        try {
            return await sub_category_1.SubCategory.create({ ...Subcategory });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns SubCategory
     */
    async findById(id) {
        try {
            const subcategoryItem = await sub_category_1.SubCategory.findByPk(id);
            if (!subcategoryItem) {
                throw new not_found_exception_1.NotFoundException("SubCategory", id);
            }
            return subcategoryItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns SubCategory
     */
    async findByName(name) {
        try {
            const subcategoryItem = await sub_category_1.SubCategory.findOne({ where: { name } });
            return subcategoryItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of SubCategory
     */
    async getAll() {
        try {
            const subCategories = await sub_category_1.SubCategory.findAll();
            return subCategories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a SubCategory as parameter
     * @Subcategory
     * returns void
     */
    async update(Subcategory) {
        const { id } = Subcategory;
        try {
            const subcategoryItem = await sub_category_1.SubCategory.findByPk(id);
            if (!subcategoryItem) {
                throw new not_found_exception_1.NotFoundException("SubCategory", id.toString());
            }
            return await subcategoryItem.update({ ...Subcategory });
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
            const subcategoryItem = await sub_category_1.SubCategory.findByPk(id);
            if (!subcategoryItem) {
                throw new not_found_exception_1.NotFoundException("SubCategory", id);
            }
            await subcategoryItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SubCategoryRepository = SubCategoryRepository;

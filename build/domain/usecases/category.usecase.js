"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUseCase = void 0;
const slugify_1 = __importDefault(require("slugify"));
class CategoryUseCase {
    categoryRepository;
    /**
     *
     */
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async createCategory(category) {
        const existingCategory = await this.categoryRepository.findByName(category.name);
        if (existingCategory) {
            throw new Error("Category already exists");
        }
        // const _category = new Category({category});
        //because it's already done in the Repository
        return this.categoryRepository.create(category);
    }
    async getAll() {
        return this.categoryRepository.getAll();
    }
    async getCategoryById(id) {
        return this.categoryRepository.findById(id);
    }
    async updateCategory(category) {
        const { id, name, description } = category;
        const obj = {
            id,
            name,
            slug: (0, slugify_1.default)(name, { lower: true, replacement: "-" }),
            description,
        };
        return this.categoryRepository.update(obj);
    }
    async deleteCategory(id) {
        return this.categoryRepository.delete(id);
    }
}
exports.CategoryUseCase = CategoryUseCase;

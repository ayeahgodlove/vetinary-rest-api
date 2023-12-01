"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryUseCase = void 0;
const slugify_1 = __importDefault(require("slugify"));
class SubCategoryUseCase {
    subCategoryRepository;
    /**
     *
     */
    constructor(subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }
    async createSubCategory(category) {
        const existingSubCategory = await this.subCategoryRepository.findByName(category.name);
        if (existingSubCategory) {
            throw new Error("SubCategory already exists");
        }
        // const _category = new SubCategory({category});
        //because it's already done in the Repository
        return this.subCategoryRepository.create(category);
    }
    async getAll() {
        return this.subCategoryRepository.getAll();
    }
    async getSubCategoryById(id) {
        return this.subCategoryRepository.findById(id);
    }
    async updateSubCategory(category) {
        const { id, name, description } = category;
        const obj = {
            id,
            name,
            slug: (0, slugify_1.default)(name, { lower: true, replacement: "-" }),
            description,
        };
        return this.subCategoryRepository.update(obj);
    }
    async deleteSubCategory(id) {
        return this.subCategoryRepository.delete(id);
    }
}
exports.SubCategoryUseCase = SubCategoryUseCase;

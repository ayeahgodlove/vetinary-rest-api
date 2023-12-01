"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const category_1 = require("../../domain/models/category");
const category_usecase_1 = require("../../domain/usecases/category.usecase");
const category_repository_1 = require("../../data/repositories/impl/category.repository");
const mapper_1 = require("../mappers/mapper");
const category_request_dto_1 = require("../dtos/category-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const categoryRepository = new category_repository_1.CategoryRepository();
const categoryUseCase = new category_usecase_1.CategoryUseCase(categoryRepository);
const categoryMapper = new mapper_1.CategoryMapper();
class CategoriesController {
    async createCategory(req, res) {
        const dto = new category_request_dto_1.CategoryRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const categoryResponse = await categoryUseCase.createCategory(dto.toData());
                res.status(201).json({
                    data: categoryResponse.toJSON(),
                    message: "Category created Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [],
                    success: false,
                });
            }
        }
    }
    async getAll(req, res) {
        try {
            const categories = await categoryUseCase.getAll();
            const categoriesDTO = categoryMapper.toDTOs(categories);
            res.json({
                data: categoriesDTO,
                message: "Success",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async getCategoryById(req, res) {
        try {
            const id = req.params.id;
            const category = await categoryUseCase.getCategoryById(id);
            if (!category) {
                throw new not_found_exception_1.NotFoundException("Category", id);
            }
            const categoryDTO = categoryMapper.toDTO(category);
            res.json({
                data: categoryDTO,
                message: "Success",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async updateCategory(req, res) {
        const dto = new category_request_dto_1.CategoryRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const id = req.params.id;
                const obj = {
                    ...category_1.emptyCategory,
                    ...req.body,
                    id: id,
                };
                const updatedCategory = await categoryUseCase.updateCategory(obj);
                const categoryDto = categoryMapper.toDTO(updatedCategory);
                res.json({
                    data: categoryDto,
                    message: "Category Updated Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [error],
                    success: false,
                });
            }
        }
    }
    async deleteCategory(req, res) {
        try {
            const id = req.params.id;
            await categoryUseCase.deleteCategory(id);
            res.status(204).json({
                message: `Operation successfully completed!`,
                validationErrors: [],
                success: true,
                data: null,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                data: null,
                validationErrors: [error],
                success: true,
            });
        }
    }
}
exports.CategoriesController = CategoriesController;

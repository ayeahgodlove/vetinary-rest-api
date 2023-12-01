"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoriesController = void 0;
const sub_category_1 = require("../../domain/models/sub-category");
const sub_category_usecase_1 = require("../../domain/usecases/sub-category.usecase");
const sub_category_repository_1 = require("../../data/repositories/impl/sub-category.repository");
const mapper_1 = require("../mappers/mapper");
const sub_category_request_dto_1 = require("../dtos/sub-category-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const subCategoryRepository = new sub_category_repository_1.SubCategoryRepository();
const subCategoryUseCase = new sub_category_usecase_1.SubCategoryUseCase(subCategoryRepository);
const subCategoryMapper = new mapper_1.SubCategoryMapper();
class SubCategoriesController {
    async createSubCategory(req, res) {
        const dto = new sub_category_request_dto_1.SubCategoryRequestDto(req.body);
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
                const categoryResponse = await subCategoryUseCase.createSubCategory(dto.toData());
                res.status(201).json({
                    data: categoryResponse.toJSON(),
                    message: "SubCategory created Successfully!",
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
            const subCategories = await subCategoryUseCase.getAll();
            const subCategoriesDTO = subCategoryMapper.toDTOs(subCategories);
            // total pages
            res.json({
                data: subCategoriesDTO,
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
    async getSubCategoryById(req, res) {
        try {
            const id = req.params.id;
            const subCategory = await subCategoryUseCase.getSubCategoryById(id);
            if (!subCategory) {
                throw new not_found_exception_1.NotFoundException("SubCategory", id);
            }
            const subCategoryDTO = subCategoryMapper.toDTO(subCategory);
            res.json({
                data: subCategoryDTO,
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
    async updateSubCategory(req, res) {
        const dto = new sub_category_request_dto_1.SubCategoryRequestDto(req.body);
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
                    ...sub_category_1.emptySubCategory,
                    ...req.body,
                    id: id,
                };
                const updatedSubCategory = await subCategoryUseCase.updateSubCategory(obj);
                const subCategoryDto = subCategoryMapper.toDTO(updatedSubCategory);
                res.json({
                    data: subCategoryDto,
                    message: "SubCategory Updated Successfully!",
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
    async deleteSubCategory(req, res) {
        try {
            const id = req.params.id;
            await subCategoryUseCase.deleteSubCategory(id);
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
exports.SubCategoriesController = SubCategoriesController;

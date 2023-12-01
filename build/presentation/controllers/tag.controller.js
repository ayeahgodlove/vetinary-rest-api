"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const tag_1 = require("../../domain/models/tag");
const tag_usecase_1 = require("../../domain/usecases/tag.usecase");
const tag_repository_1 = require("../../data/repositories/impl/tag.repository");
const mapper_1 = require("../mappers/mapper");
const tag_request_dto_1 = require("../dtos/tag-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const tagRepository = new tag_repository_1.TagRepository();
const tagUseCase = new tag_usecase_1.TagUseCase(tagRepository);
const tagMapper = new mapper_1.TagMapper();
class CategoriesController {
    async createTag(req, res) {
        const dto = new tag_request_dto_1.TagRequestDto(req.body);
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
                const tagResponse = await tagUseCase.createTag(dto.toData());
                res.status(201).json({
                    data: tagResponse.toJSON(),
                    message: "Tag created Successfully!",
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
            const categories = await tagUseCase.getAll();
            const categoriesDTO = tagMapper.toDTOs(categories);
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
    async getTagById(req, res) {
        try {
            const id = req.params.id;
            const tag = await tagUseCase.getTagById(id);
            if (!tag) {
                throw new not_found_exception_1.NotFoundException("Tag", id);
            }
            const tagDTO = tagMapper.toDTO(tag);
            res.json({
                data: tagDTO,
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
    async updateTag(req, res) {
        const dto = new tag_request_dto_1.TagRequestDto(req.body);
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
                    ...tag_1.emptyTag,
                    ...req.body,
                    id: id,
                };
                const updatedTag = await tagUseCase.updateTag(obj);
                const tagDto = tagMapper.toDTO(updatedTag);
                res.json({
                    data: tagDto,
                    message: "Tag Updated Successfully!",
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
    async deleteTag(req, res) {
        try {
            const id = req.params.id;
            await tagUseCase.deleteTag(id);
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

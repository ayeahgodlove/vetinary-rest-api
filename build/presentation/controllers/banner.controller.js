"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannersController = void 0;
const banner_1 = require("../../domain/models/banner");
const banner_usecase_1 = require("../../domain/usecases/banner.usecase");
const banner_repository_1 = require("../../data/repositories/impl/banner.repository");
const mapper_1 = require("../mappers/mapper");
const banner_request_dto_1 = require("../dtos/banner-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const bannerRepository = new banner_repository_1.BannerRepository();
const bannerUseCase = new banner_usecase_1.BannerUseCase(bannerRepository);
const bannerMapper = new mapper_1.BannerMapper();
class BannersController {
    async createBanner(req, res) {
        const dto = new banner_request_dto_1.BannerRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        const user = req.user;
        const { filename } = req.file;
        if (filename === undefined) {
            throw new Error("Photo not found!");
        }
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
                const bannerResponse = await bannerUseCase.createBanner({
                    ...dto.toData(),
                    userId: user.id,
                    image: filename.toString(),
                });
                res.status(201).json({
                    data: bannerResponse.toJSON(),
                    message: "Banner created Successfully!",
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
            const banners = await bannerUseCase.getAll();
            const bannersDTO = bannerMapper.toDTOs(banners);
            res.json({
                data: bannersDTO,
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
    async getBannerById(req, res) {
        try {
            const id = req.params.id;
            const banner = await bannerUseCase.getBannerById(id);
            if (!banner) {
                throw new not_found_exception_1.NotFoundException("Banner", id);
            }
            const bannerDTO = bannerMapper.toDTO(banner);
            res.json({
                data: bannerDTO,
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
    async updateBanner(req, res) {
        const dto = new banner_request_dto_1.BannerRequestDto(req.body);
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
                    ...banner_1.emptyBanner,
                    ...req.body,
                    id: id,
                };
                const updatedBanner = await bannerUseCase.updateBanner(obj);
                const bannerDto = bannerMapper.toDTO(updatedBanner);
                res.json({
                    data: bannerDto,
                    message: "Banner Updated Successfully!",
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
    async deleteBanner(req, res) {
        try {
            const id = req.params.id;
            await bannerUseCase.deleteBanner(id);
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
exports.BannersController = BannersController;

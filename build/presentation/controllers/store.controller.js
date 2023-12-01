"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresController = void 0;
const store_1 = require("../../domain/models/store");
const store_usecase_1 = require("../../domain/usecases/store.usecase");
const store_repository_1 = require("../../data/repositories/impl/store.repository");
const mapper_1 = require("../mappers/mapper");
const store_request_dto_1 = require("../dtos/store-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const storeRepository = new store_repository_1.StoreRepository();
const storeUseCase = new store_usecase_1.StoreUseCase(storeRepository);
const storeMapper = new mapper_1.StoreMapper();
class StoresController {
    async createStore(req, res) {
        const dto = new store_request_dto_1.StoreRequestDto(req.body);
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
                const storeResponse = await storeUseCase.createStore({
                    ...dto.toData(),
                    userId: user.id,
                    imageBannerUrl: filename.toString(),
                });
                res.status(201).json({
                    data: storeResponse.toJSON(),
                    message: "Store created Successfully!",
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
            const stores = await storeUseCase.getAll();
            const storesDTO = storeMapper.toDTOs(stores);
            res.json({
                data: storesDTO,
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
    async getStoreById(req, res) {
        try {
            const id = req.params.id;
            const store = await storeUseCase.getStoreById(id);
            if (!store) {
                throw new not_found_exception_1.NotFoundException("Store", id);
            }
            const storeDTO = storeMapper.toDTO(store);
            res.json({
                data: storeDTO,
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
    async updateStore(req, res) {
        const dto = new store_request_dto_1.StoreRequestDto(req.body);
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
                    ...store_1.emptyStore,
                    ...req.body,
                    id: id,
                };
                const updatedStore = await storeUseCase.updateStore(obj);
                const storeDto = storeMapper.toDTO(updatedStore);
                res.json({
                    data: storeDto,
                    message: "Store Updated Successfully!",
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
    async deleteStore(req, res) {
        try {
            const id = req.params.id;
            await storeUseCase.deleteStore(id);
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
exports.StoresController = StoresController;

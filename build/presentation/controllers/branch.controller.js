"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesController = void 0;
const branch_1 = require("../../domain/models/branch");
const branch_usecase_1 = require("../../domain/usecases/branch.usecase");
const branch_repository_1 = require("../../data/repositories/impl/branch.repository");
const mapper_1 = require("../mappers/mapper");
const branch_request_dto_1 = require("../dtos/branch-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const branchRepository = new branch_repository_1.BranchRepository();
const branchUseCase = new branch_usecase_1.BranchUseCase(branchRepository);
const branchMapper = new mapper_1.BranchMapper();
class BranchesController {
    async createBranch(req, res) {
        const dto = new branch_request_dto_1.BranchRequestDto(req.body);
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
                const branchResponse = await branchUseCase.createBranch(dto.toData());
                res.status(201).json({
                    data: branchResponse.toJSON(),
                    message: "Branch created Successfully!",
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
            const branches = await branchUseCase.getAll();
            const branchesDTO = branchMapper.toDTOs(branches);
            res.json({
                data: branchesDTO,
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
    async getBranchById(req, res) {
        try {
            const id = req.params.id;
            const branch = await branchUseCase.getBranchById(id);
            if (!branch) {
                throw new not_found_exception_1.NotFoundException("Branch", id);
            }
            const branchDTO = branchMapper.toDTO(branch);
            res.json({
                data: branchDTO,
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
    async updateBranch(req, res) {
        const dto = new branch_request_dto_1.BranchRequestDto(req.body);
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
                    ...branch_1.emptyBranch,
                    ...req.body,
                    id: id,
                };
                const updatedBranch = await branchUseCase.updateBranch(obj);
                const branchDto = branchMapper.toDTO(updatedBranch);
                res.json({
                    data: branchDto,
                    message: "Branch Updated Successfully!",
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
    async deleteBranch(req, res) {
        try {
            const id = req.params.id;
            await branchUseCase.deleteBranch(id);
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
exports.BranchesController = BranchesController;

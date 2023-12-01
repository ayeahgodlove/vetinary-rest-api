"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesController = void 0;
const role_1 = require("../../domain/models/role");
const role_usecase_1 = require("../../domain/usecases/role.usecase");
const role_repository_1 = require("../../data/repositories/impl/role.repository");
const mapper_1 = require("../mappers/mapper");
const role_request_dto_1 = require("../dtos/role-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const roleRepository = new role_repository_1.RoleRepository();
const roleUseCase = new role_usecase_1.RoleUseCase(roleRepository);
const roleMapper = new mapper_1.RoleMapper();
class RolesController {
    async createRole(req, res) {
        const dto = new role_request_dto_1.RoleRequestDto(req.body);
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
                const roleResponse = await roleUseCase.createRole(dto.toData());
                res.status(201).json({
                    data: roleResponse.toJSON(),
                    message: "Role created Successfully!",
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
            const roles = await roleUseCase.getAll();
            const rolesDTO = roleMapper.toDTOs(roles);
            res.json({
                data: rolesDTO,
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
    async getRoleById(req, res) {
        try {
            const id = req.params.id;
            const role = await roleUseCase.getRoleById(id);
            if (!role) {
                throw new not_found_exception_1.NotFoundException("Role", id);
            }
            const roleDTO = roleMapper.toDTO(role);
            res.json({
                data: roleDTO,
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
    async updateRole(req, res) {
        const dto = new role_request_dto_1.RoleRequestDto(req.body);
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
                    ...role_1.emptyRole,
                    ...req.body,
                    id: id,
                };
                const updatedRole = await roleUseCase.updateRole(obj);
                const roleDto = roleMapper.toDTO(updatedRole);
                res.json({
                    data: roleDto,
                    message: "Role Updated Successfully!",
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
    async deleteRole(req, res) {
        try {
            const id = req.params.id;
            await roleUseCase.deleteRole(id);
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
exports.RolesController = RolesController;

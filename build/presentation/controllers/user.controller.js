"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_1 = require("../../domain/models/user");
const user_usecase_1 = require("../../domain/usecases/user.usecase");
const user_repository_1 = require("../../data/repositories/impl/user.repository");
const mapper_1 = require("../mappers/mapper");
const user_request_dto_1 = require("../dtos/user-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const user_2 = require("../../data/entities/user");
const role_1 = require("../../data/entities/role");
const role_repository_1 = require("../../data/repositories/impl/role.repository");
const role_usecase_1 = require("../../domain/usecases/role.usecase");
const role_request_dto_1 = require("../dtos/role-request.dto");
const role_2 = require("../../domain/models/role");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authz_middleware_1 = require("../../shared/middlewares/authz.middleware");
const email_1 = require("../../utils/email");
const http_exception_1 = __importDefault(require("../../shared/middlewares/http-exception"));
const userRepository = new user_repository_1.UserRepository();
const roleRepository = new role_repository_1.RoleRepository();
const userUseCase = new user_usecase_1.UserUseCase(userRepository);
const roleUseCase = new role_usecase_1.RoleUseCase(roleRepository);
const userMapper = new mapper_1.UserMapper();
const roleMapper = new mapper_1.RoleMapper();
class UsersController {
    async createUser(req, res, next) {
        const { userRole } = req.body;
        const roleDto = new role_request_dto_1.RoleRequestDto({
            ...role_2.emptyRole,
            name: userRole,
        });
        const dto = new user_request_dto_1.UserRequestDto(req.body);
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
                const userResponse = await userUseCase.createUser(dto.toData());
                const [response, bool] = await role_1.Role.findOrCreate({
                    where: { id: roleDto.toData().id, name: roleDto.toData().name },
                });
                // const roleRespone = await roleUseCase.createRole(roleDto.toData());
                // Associate roles with the user
                await userResponse.$add("roles", [response]);
                // Retrieve user roles
                const userRoles = await userResponse.$get("roles");
                const rolesDTO = roleMapper.toDTOs(userRoles);
                const user = {
                    ...userResponse.toJSON(),
                    roles: rolesDTO,
                };
                const activationToken = createActivationToken(user);
                const activationUrl = `http://localhost:3000/activation/${activationToken}`;
                await (0, email_1.sendRegistrationMail)(user.email, activationUrl);
                res.status(201).json({
                    data: {
                        ...user,
                        token: activationToken,
                    },
                    message: `User created Successfully!, Please check your email:- ${user.email} to activate your account: ${activationUrl}`,
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
                return next(new http_exception_1.default(500, error.message, error));
            }
        }
    }
    async getAll(req, res) {
        try {
            const users = await userUseCase.getAll();
            const usersDTO = userMapper.toDTOs(users);
            res.json({
                data: usersDTO,
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
    async updateUser(req, res) {
        const dto = new user_request_dto_1.UserRequestDto(req.body);
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
                    ...user_1.emptyUser,
                    ...req.body,
                    id: id,
                };
                const updatedUser = await userUseCase.updateUser(obj);
                const userDto = userMapper.toDTO(updatedUser);
                res.json({
                    data: userDto,
                    message: "User Updated Successfully!",
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
    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            await userUseCase.deleteUser(id);
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
    async uploadAvatar(req, res) {
        const user = req.user;
        const { filename } = req.file;
        try {
            await userUseCase.updateAvatar(user.id, filename);
            res.json({
                message: "User Avatar uploaded Successfully!",
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                success: false,
            });
        }
    }
    // Add a role to a user
    async addUserRole(req, res) {
        try {
            const userId = Number(req.params.userId);
            const roleId = Number(req.params.roleId);
            // Find the user and role using their IDs
            const user = await user_2.User.findByPk(userId);
            const role = await role_1.Role.findByPk(roleId);
            if (!user || !role) {
                res
                    .status(404)
                    .json({ message: "User or role not found", success: false });
                return;
            }
            // Add the role to the user using Sequelize association methods
            await user.$add("role", role);
            res.status(200).json({
                message: "Role added to the user successfully",
                success: true,
                validationErrors: [],
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
                data: null,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async activateUser(req, res, next) {
        try {
            const { activationToken } = req.body;
            const newUser = jsonwebtoken_1.default.verify(activationToken, authz_middleware_1.SECRET_KEY, {
                algorithms: ["HS256"],
            });
            if (!newUser) {
                return next(new http_exception_1.default(400, "Invalid token"));
            }
            const user = await user_2.User.findOne({ where: { email: newUser.email } });
            if (!user) {
                return next(new http_exception_1.default(400, "Something went wrong: user doesn't exist"));
            }
            const userResponse = await user.update({ verified: true });
            // Retrieve user roles
            const userRoles = await userResponse.$get("roles");
            const rolesDTO = roleMapper.toDTOs(userRoles);
            const userEntity = {
                ...userResponse.toJSON(),
                roles: rolesDTO,
            };
            const token = jsonwebtoken_1.default.sign(userEntity, authz_middleware_1.SECRET_KEY, {
                expiresIn: 86400,
                header: authz_middleware_1.header,
            });
            res.status(200).json({
                success: true,
                message: "Your account has been Activated Successfully!",
                data: {
                    ...userEntity,
                    token,
                },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }
}
exports.UsersController = UsersController;
function createActivationToken(user) {
    const token = jsonwebtoken_1.default.sign(user, authz_middleware_1.SECRET_KEY, {
        expiresIn: 86400,
        header: authz_middleware_1.header,
    });
    return token;
}

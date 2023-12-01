"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
// src/infrastructure/routes/category-routes.ts
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../../data/entities/user");
const mapper_1 = require("../../mappers/mapper");
const authz_middleware_1 = require("../../../shared/middlewares/authz.middleware");
const roleMapper = new mapper_1.RoleMapper();
const authRoutes = (0, express_1.Router)();
exports.authRoutes = authRoutes;
authRoutes.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }
        const userRoles = await user.$get("roles");
        const rolesDTO = roleMapper.toDTOs(userRoles);
        const userEntity = {
            ...user.toJSON(),
            roles: rolesDTO,
        };
        const hashedPassword = await bcrypt_1.default.compare(password, `${userEntity.password}`);
        if (!hashedPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign(userEntity, authz_middleware_1.SECRET_KEY, {
            expiresIn: 86400,
            header: authz_middleware_1.header
        });
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).json({
            success: true,
            message: "Login Successfully!",
            data: {
                ...userEntity,
                token,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Login Failed" + error.message,
            data: error,
        });
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/role-routes.ts
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const roleController = new role_controller_1.RolesController();
const roleRouter = (0, express_1.Router)();
roleRouter.get("", roleController.getAll);
roleRouter.get("/:id", roleController.getRoleById);
roleRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, roleController.createRole);
roleRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, roleController.updateRole);
roleRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, roleController.deleteRole);
exports.default = roleRouter;

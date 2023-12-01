"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/branch-routes.ts
const express_1 = require("express");
const branch_controller_1 = require("../controllers/branch.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const branchController = new branch_controller_1.BranchesController();
const branchRouter = (0, express_1.Router)();
branchRouter.get("", branchController.getAll);
branchRouter.get("/:id", branchController.getBranchById);
branchRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, branchController.createBranch);
branchRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, branchController.updateBranch);
branchRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, branchController.deleteBranch);
exports.default = branchRouter;

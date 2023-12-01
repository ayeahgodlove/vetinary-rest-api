"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/category-routes.ts
const express_1 = require("express");
const sub_category_controller_1 = require("../controllers/sub-category.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const subCategoryController = new sub_category_controller_1.SubCategoriesController();
const subCategoryRouter = (0, express_1.Router)();
subCategoryRouter.get("", subCategoryController.getAll);
subCategoryRouter.get("/:id", subCategoryController.getSubCategoryById);
subCategoryRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, subCategoryController.createSubCategory);
subCategoryRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, subCategoryController.updateSubCategory);
subCategoryRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, subCategoryController.deleteSubCategory);
exports.default = subCategoryRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/tag-routes.ts
const express_1 = require("express");
const tag_controller_1 = require("../controllers/tag.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const tagController = new tag_controller_1.CategoriesController();
const tagRouter = (0, express_1.Router)();
tagRouter.get("", tagController.getAll);
tagRouter.get("/:id", tagController.getTagById);
tagRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, tagController.createTag);
tagRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, tagController.updateTag);
tagRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, tagController.deleteTag);
exports.default = tagRouter;

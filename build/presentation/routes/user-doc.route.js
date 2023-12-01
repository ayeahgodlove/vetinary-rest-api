"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/userDoc-routes.ts
const express_1 = require("express");
const user_doc_controller_1 = require("../controllers/user-doc.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = require("../../shared/helper/multer.config");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/documents");
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname;
        const filename = `${Date.now()}-${originalname
            .replace(/\s+/g, "")
            .toLowerCase()}`;
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: multer_config_1.fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
const userDocController = new user_doc_controller_1.UserDocsController();
const userDocRouter = (0, express_1.Router)();
userDocRouter.get("", is_authenticated_middleware_1.isAuthenticatedMiddleware, userDocController.getAll);
userDocRouter.get("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userDocController.getUserDocById);
userDocRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.fields([
    {
        name: "idCard1",
        maxCount: 1,
    },
    {
        name: "idCard2",
        maxCount: 1,
    },
    {
        name: "passportPhoto",
        maxCount: 1,
    },
]), userDocController.createUserDoc);
userDocRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userDocController.updateUserDoc);
userDocRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userDocController.deleteUserDoc);
exports.default = userDocRouter;

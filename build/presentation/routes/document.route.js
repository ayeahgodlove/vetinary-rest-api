"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/document-routes.ts
const express_1 = require("express");
const document_controller_1 = require("../controllers/document.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const multer_1 = __importDefault(require("multer"));
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
    limits: { fileSize: 5 * 1024 * 1024 },
});
const documentController = new document_controller_1.DocumentsController();
const documentRouter = (0, express_1.Router)();
documentRouter.get("", documentController.getAll);
documentRouter.get("/:id", documentController.getDocumentById);
documentRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.single("fileUrl"), documentController.createDocument);
documentRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.single("fileUrl"), documentController.updateDocument);
documentRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, documentController.deleteDocument);
exports.default = documentRouter;

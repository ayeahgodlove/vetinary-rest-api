"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/product-routes.ts
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = require("../../shared/helper/multer.config");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/products");
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
const productController = new product_controller_1.ProductsController();
const productRouter = (0, express_1.Router)();
productRouter.get("", productController.getAll);
productRouter.get("/search", productController.search);
productRouter.get("/:id", productController.getProductById);
productRouter.get("/:categoryId", productController.getProductsByCategory);
productRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.fields([{ name: "productImages", maxCount: 5 }]), productController.createProduct);
productRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.fields([{ name: "productImages", maxCount: 5 }]), productController.updateProduct);
productRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, productController.deleteProduct);
exports.default = productRouter;

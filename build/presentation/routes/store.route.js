"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/store-routes.ts
const express_1 = require("express");
const store_controller_1 = require("../controllers/store.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = require("../../shared/helper/multer.config");
const storeController = new store_controller_1.StoresController();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/stores");
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
const storeRouter = (0, express_1.Router)();
storeRouter.get("", storeController.getAll);
storeRouter.get("/:id", storeController.getStoreById);
storeRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.single("imageBannerUrl"), storeController.createStore);
storeRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.single("imageBannerUrl"), storeController.updateStore);
storeRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, storeController.deleteStore);
exports.default = storeRouter;

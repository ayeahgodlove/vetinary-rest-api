"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/banner-routes.ts
const express_1 = require("express");
const banner_controller_1 = require("../controllers/banner.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = require("../../shared/helper/multer.config");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/banners");
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname;
        const filename = `${Date.now()}-${originalname.replace(/\s+/g, '').toLowerCase()}`;
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: multer_config_1.fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
const bannerController = new banner_controller_1.BannersController();
const bannerRouter = (0, express_1.Router)();
bannerRouter.get("", bannerController.getAll);
bannerRouter.get("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, bannerController.getBannerById);
bannerRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.single("image"), bannerController.createBanner);
bannerRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.single("image"), bannerController.updateBanner);
bannerRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, bannerController.deleteBanner);
exports.default = bannerRouter;

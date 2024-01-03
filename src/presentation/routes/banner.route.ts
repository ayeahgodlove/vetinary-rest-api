// src/infrastructure/routes/banner-routes.ts
import { Router } from "express";
import { BannersController } from "../controllers/banner.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";
import multer from "multer";
import { fileFilter } from "../../shared/helper/multer.config";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/banners");
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const filename = `${Date.now()}-${originalname.replace(/\s+/g, '').toLowerCase()}`
    cb(null, filename)
  },
});


const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
const bannerController = new BannersController();

const bannerRouter = Router();

bannerRouter.get("",bannerController.getAll);
bannerRouter.get("/:id", isAuthenticatedMiddleware, bannerController.getBannerById);
bannerRouter.post(
  "",
  isAuthenticatedMiddleware,
  upload.single("image"),
  bannerController.createBanner
);
bannerRouter.put(
  "/:id",
  isAuthenticatedMiddleware,
  upload.single("image"),
  bannerController.updateBanner
);
bannerRouter.delete("/:id", isAuthenticatedMiddleware, bannerController.deleteBanner);

export default bannerRouter;

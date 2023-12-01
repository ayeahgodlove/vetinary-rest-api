// src/infrastructure/routes/product-routes.ts
import { Router } from "express";
import { ProductsController } from "../controllers/product.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

import multer from "multer";
import { fileFilter } from "../../shared/helper/multer.config";

const storage = multer.diskStorage({
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

const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const productController = new ProductsController();

const productRouter = Router();

productRouter.get("", productController.getAll);
productRouter.get("/search", productController.search);
productRouter.get("/:id", productController.getProductById);
productRouter.get("/:categoryId", productController.getProductsByCategory);
productRouter.post(
  "",
  isAuthenticatedMiddleware,
  isAuthenticatedMiddleware,
  upload.fields([{ name: "productImages", maxCount: 5 }]),
  productController.createProduct
);
productRouter.put(
  "/:id",
  isAuthenticatedMiddleware,
  isAuthenticatedMiddleware,
  upload.fields([{ name: "productImages", maxCount: 5 }]),
  productController.updateProduct
);
productRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  productController.deleteProduct
);

export default productRouter;

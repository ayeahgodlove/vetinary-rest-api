// src/infrastructure/routes/document-routes.ts
import { Router } from "express";
import { DocumentsController } from "../controllers/document.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";
import multer from "multer";

const storage = multer.diskStorage({
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

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const documentController = new DocumentsController();

const documentRouter = Router();

documentRouter.get("", documentController.getAll);
documentRouter.get("/:id", documentController.getDocumentById);
documentRouter.post(
  "",
  isAuthenticatedMiddleware,
  upload.single("fileUrl"),
  documentController.createDocument
);
documentRouter.put(
  "/:id",
  isAuthenticatedMiddleware,
  upload.single("fileUrl"),
  documentController.updateDocument
);
documentRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  documentController.deleteDocument
);

export default documentRouter;

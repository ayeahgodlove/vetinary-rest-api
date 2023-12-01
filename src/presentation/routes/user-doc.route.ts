// src/infrastructure/routes/userDoc-routes.ts
import { Router } from "express";
import { UserDocsController } from "../controllers/user-doc.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";
import multer from "multer";
import { fileFilter } from "../../shared/helper/multer.config";

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
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const userDocController = new UserDocsController();

const userDocRouter = Router();

userDocRouter.get("", isAuthenticatedMiddleware, userDocController.getAll);
userDocRouter.get(
  "/:id",
  isAuthenticatedMiddleware,
  userDocController.getUserDocById
);
userDocRouter.post(
  "",
  isAuthenticatedMiddleware,
  upload.fields([
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
  ]),
  userDocController.createUserDoc
);
userDocRouter.put(
  "/:id",
  isAuthenticatedMiddleware,
  userDocController.updateUserDoc
);
userDocRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  userDocController.deleteUserDoc
);

export default userDocRouter;

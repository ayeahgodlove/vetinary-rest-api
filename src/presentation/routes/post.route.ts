// src/infrastructure/routes/post-routes.ts
import { Router } from "express";
import { PostsController } from "../controllers/post.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";
import multer from "multer";
import { fileFilter } from "../../shared/helper/multer.config";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/posts");
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
const postController = new PostsController();

const postRouter = Router();

postRouter.get("", postController.getAll);
postRouter.get("/:id", postController.getPostById);
postRouter.post("", isAuthenticatedMiddleware,upload.single("imageUrl"), postController.createPost);
postRouter.put("/:id",isAuthenticatedMiddleware, upload.single("imageUrl"), postController.updatePost);
postRouter.delete("/:id",isAuthenticatedMiddleware, postController.deletePost);

export default postRouter;

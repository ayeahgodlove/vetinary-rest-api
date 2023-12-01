// src/infrastructure/routes/course-routes.ts
import { Router } from "express";
import { isAuthenticatedMiddleware } from "../../../shared/middlewares/is-authenticated.middleware";
import { CoursesController } from "../../controllers/lms/course.controller";
import multer from "multer";
import { fileFilter } from "../../../shared/helper/multer.config";

const courseController = new CoursesController();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/courses");
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

const courseRouter = Router();

courseRouter.get("", courseController.getAll);
courseRouter.get("/:id", courseController.getCourseById);
courseRouter.post(
  "",
  isAuthenticatedMiddleware,
  upload.single("courseImage"),
  courseController.createCourse
);
courseRouter.put(
  "/:id",
  isAuthenticatedMiddleware,
  upload.single("courseImage"),
  courseController.updateCourse
);
courseRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  courseController.deleteCourse
);

export default courseRouter;

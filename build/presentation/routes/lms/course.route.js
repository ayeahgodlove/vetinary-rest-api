"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/course-routes.ts
const express_1 = require("express");
const is_authenticated_middleware_1 = require("../../../shared/middlewares/is-authenticated.middleware");
const course_controller_1 = require("../../controllers/lms/course.controller");
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = require("../../../shared/helper/multer.config");
const courseController = new course_controller_1.CoursesController();
const storage = multer_1.default.diskStorage({
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
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: multer_config_1.fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
const courseRouter = (0, express_1.Router)();
courseRouter.get("", courseController.getAll);
courseRouter.get("/:id", courseController.getCourseById);
courseRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.single("courseImage"), courseController.createCourse);
courseRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.single("courseImage"), courseController.updateCourse);
courseRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, courseController.deleteCourse);
exports.default = courseRouter;

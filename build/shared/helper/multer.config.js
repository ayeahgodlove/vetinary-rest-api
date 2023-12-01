"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerInstance = exports.fileFilter = void 0;
const multer_1 = __importDefault(require("multer"));
// Create a Multer storage engine that saves files to disk
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/avatars");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        return cb(new Error("Invalid image type"));
    }
};
exports.fileFilter = fileFilter;
// create a multer instance with the storage engine
const multerInstance = (0, multer_1.default)({
    storage: storage,
    fileFilter: exports.fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
exports.multerInstance = multerInstance;

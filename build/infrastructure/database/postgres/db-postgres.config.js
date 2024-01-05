"use strict";
/**
 * Set-by-step build Node.js Resful CRUD API using Express, Sequelize with MySQL
 * Sequelize is a promise-based Node.j ORM that supports the dialects for Postgres, MysQL, and SQL server
 * Sequelize with MySQL
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDbConfig = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const category_1 = require("../../../data/entities/category");
const dotenv = __importStar(require("dotenv"));
const user_1 = require("../../../data/entities/user");
const role_1 = require("../../../data/entities/role");
const lesson_review_1 = require("../../../data/entities/lesson-review");
const product_review_1 = require("../../../data/entities/product-review");
const user_doc_1 = require("../../../data/entities/user-doc");
const branch_1 = require("../../../data/entities/branch");
const store_1 = require("../../../data/entities/store");
const product_1 = require("../../../data/entities/product");
const user_role_1 = require("../../../data/entities/user-role");
const tag_1 = require("../../../data/entities/tag");
const post_1 = require("../../../data/entities/post");
const document_1 = require("../../../data/entities/document");
const comment_1 = require("../../../data/entities/comment");
const post_tag_1 = require("../../../data/entities/post-tag");
const document_tag_1 = require("../../../data/entities/document-tag");
const banner_1 = require("../../../data/entities/banner");
const sub_category_1 = require("../../../data/entities/sub-category");
const user_store_1 = require("../../../data/entities/user-store");
const order_1 = require("../../../data/entities/order");
const payment_1 = require("../../../data/entities/payment");
const product_order_1 = require("../../../data/entities/product-order");
const course_1 = require("../../../data/entities/lms/course");
const lesson_1 = require("../../../data/entities/lms/lesson");
const enrollment_1 = require("../../../data/entities/lms/enrollment");
const quiz_1 = require("../../../data/entities/lms/quiz");
const appointment_1 = require("../../../data/entities/health/appointment");
const consultation_1 = require("../../../data/entities/health/consultation");
dotenv.config();
class PostgresDbConfig {
    _sequelize;
    /**
     *
     */
    constructor() {
        this._sequelize = new sequelize_typescript_1.Sequelize({
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB,
            port: parseInt(process.env.DB_PORT || "5432", 10),
            host: process.env.HOST,
            dialect: "postgres",
            models: [
                category_1.Category,
                sub_category_1.SubCategory,
                tag_1.Tag,
                user_1.User,
                role_1.Role,
                user_role_1.UserRole,
                post_1.Post,
                document_1.DocumentFile,
                comment_1.Comment,
                post_tag_1.PostTag,
                document_tag_1.DocumentTag,
                user_doc_1.UserDoc,
                branch_1.Branch,
                store_1.Store,
                product_1.Product,
                user_store_1.UserStore,
                product_review_1.ProductReview,
                banner_1.Banner,
                order_1.Order,
                payment_1.Payment,
                product_order_1.ProductOrder,
                // lms
                course_1.Course,
                lesson_1.Lesson,
                enrollment_1.Enrollment,
                quiz_1.Quiz,
                lesson_review_1.LessonReview,
                // health
                appointment_1.Appointment,
                consultation_1.Consultation
            ],
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 3000,
                idle: 1000,
            },
            ssl: true,
        });
    }
    get sequelize() {
        return this._sequelize;
    }
    connection = async () => {
        try {
            await this.sequelize.sync();
            console.log("Postgres connection has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the postgres database:", error);
        }
    };
}
exports.PostgresDbConfig = PostgresDbConfig;

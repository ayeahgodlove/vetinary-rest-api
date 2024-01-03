/**
 * Set-by-step build Node.js Resful CRUD API using Express, Sequelize with MySQL
 * Sequelize is a promise-based Node.j ORM that supports the dialects for Postgres, MysQL, and SQL server
 * Sequelize with MySQL
 */

import { Sequelize } from "sequelize-typescript";
import { Category } from "../../../data/entities/category";

import * as dotenv from "dotenv";
import { User } from "../../../data/entities/user";
import { Role } from "../../../data/entities/role";
import { LessonReview } from "../../../data/entities/lesson-review";
import { ProductReview } from "../../../data/entities/product-review";
import { UserDoc } from "../../../data/entities/user-doc";
import { Branch } from "../../../data/entities/branch";
import { Store } from "../../../data/entities/store";
import { Product } from "../../../data/entities/product";
import { UserRole } from "../../../data/entities/user-role";
import { Tag } from "../../../data/entities/tag";
import { Post } from "../../../data/entities/post";
import { DocumentFile } from "../../../data/entities/document";
import { Comment } from "../../../data/entities/comment";
import { PostTag } from "../../../data/entities/post-tag";
import { DocumentTag } from "../../../data/entities/document-tag";
import { Banner } from "../../../data/entities/banner";
import { SubCategory } from "../../../data/entities/sub-category";
import { UserStore } from "../../../data/entities/user-store";
import { Order } from "../../../data/entities/order";
import { Payment } from "../../../data/entities/payment";
import { ProductOrder } from "../../../data/entities/product-order";
import { Course } from "../../../data/entities/lms/course";
import { Lesson } from "../../../data/entities/lms/lesson";
import { Enrollment } from "../../../data/entities/lms/enrollment";
import { Quiz } from "../../../data/entities/lms/quiz";
import { Appointment } from "../../../data/entities/health/appointment";
import { Consultation } from "../../../data/entities/health/consultation";

dotenv.config();

export class PostgresDbConfig {
  private readonly _sequelize!: Sequelize;
  /**
   *
   */
  constructor() {
    this._sequelize = new Sequelize({
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      port: parseInt(process.env.DB_PORT || "5432", 10),
      host: process.env.HOST,
      dialect: "postgres",
      models: [
        Category,
        SubCategory,
        Tag,
        User,
        Role,
        UserRole,
        Post,
        DocumentFile,
        Comment,
        PostTag,
        DocumentTag,
        UserDoc,
        Branch,
        Store,
        Product,
        UserStore,
        ProductReview,
        Banner,
        Order,
        Payment,
        ProductOrder,
        // lms
        Course,
        Lesson,
        Enrollment,
        Quiz,
        LessonReview,
        // health
        Appointment,
        Consultation
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

  public get sequelize() {
    return this._sequelize;
  }

  connection = async () => {
    try {
      await this.sequelize.sync();
      console.log("Postgres connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the postgres database:", error);
    }
  };
}

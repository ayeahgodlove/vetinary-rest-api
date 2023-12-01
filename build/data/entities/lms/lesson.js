"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../user");
const review_1 = require("../review");
//  // Additional properties
//  author?: string;
//  category?: string;
//  language?: string;
//  targetAudience?: string;
//  rating?: number;
//  reviews?: Review[];
let Lesson = class Lesson extends sequelize_typescript_1.Model {
    title;
    description;
    content;
    duration;
    difficulty;
    // // dependencies
    prerequisites;
    objectives;
    keywords;
    // Additional properties
    author;
    category;
    language;
    targetAudience;
    rating;
    authorId;
    user;
    reviews;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "duration", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "difficulty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: false,
    }),
    __metadata("design:type", Array)
], Lesson.prototype, "prerequisites", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: false,
    }),
    __metadata("design:type", Array)
], Lesson.prototype, "objectives", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: false,
    }),
    __metadata("design:type", Array)
], Lesson.prototype, "keywords", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "language", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "targetAudience", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User) // foreign key
    ,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "authorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User, "userId"),
    __metadata("design:type", user_1.User)
], Lesson.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => review_1.Review),
    __metadata("design:type", Array)
], Lesson.prototype, "reviews", void 0);
Lesson = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: "lesson",
        modelName: "Lesson",
    })
], Lesson);
exports.Lesson = Lesson;

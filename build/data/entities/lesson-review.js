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
exports.LessonReview = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const lesson_1 = require("./lms/lesson");
let LessonReview = class LessonReview extends sequelize_typescript_1.Model {
    lessonId;
    userId;
    comment;
    rating;
    user;
    lesson;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], LessonReview.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => lesson_1.Lesson),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], LessonReview.prototype, "lessonId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], LessonReview.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], LessonReview.prototype, "comment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], LessonReview.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User),
    __metadata("design:type", user_1.User)
], LessonReview.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => lesson_1.Lesson, "lessonId"),
    __metadata("design:type", lesson_1.Lesson)
], LessonReview.prototype, "lesson", void 0);
LessonReview = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: "lesson_review",
    })
], LessonReview);
exports.LessonReview = LessonReview;

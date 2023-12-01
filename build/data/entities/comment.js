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
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const post_1 = require("./post");
let Comment = Comment_1 = class Comment extends sequelize_typescript_1.Model {
    content;
    userId;
    postId;
    publishedAt;
    post;
    user;
    // extra fields
    parent_id;
    parent;
    replies;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User) // foreign key
    ,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => post_1.Post) // foreign key
    ,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Comment.prototype, "postId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Comment.prototype, "publishedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => post_1.Post, "postId"),
    __metadata("design:type", post_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User, "userId"),
    __metadata("design:type", user_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Comment_1) // foreign key
    ,
    (0, sequelize_typescript_1.Column)({
        allowNull: true, // Allow null values for parent_id
    }),
    __metadata("design:type", String)
], Comment.prototype, "parent_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Comment_1, {
        foreignKey: "parent_id",
        constraints: false, // Disable constraints for parent_id
    }),
    __metadata("design:type", Comment)
], Comment.prototype, "parent", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Comment_1, { foreignKey: "parent_id", as: "replies" }),
    __metadata("design:type", Array)
], Comment.prototype, "replies", void 0);
Comment = Comment_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: "comment",
        modelName: "Comment",
    })
], Comment);
exports.Comment = Comment;

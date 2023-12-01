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
exports.Post = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const category_1 = require("./category");
const comment_1 = require("./comment");
const post_tag_1 = require("./post-tag");
const tag_1 = require("./tag");
let Post = class Post extends sequelize_typescript_1.Model {
    title;
    slug;
    content;
    imageUrl;
    publishedAt;
    authorId;
    categoryId;
    user;
    category;
    comments;
    tags;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Post.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Post.prototype, "slug", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Post.prototype, "imageUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        // allowNull: false,
    }),
    __metadata("design:type", Date)
], Post.prototype, "publishedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User) // foreign key
    ,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Post.prototype, "authorId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_1.Category) // foreign key
    ,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Post.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User, "authorId"),
    __metadata("design:type", user_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_1.Category, "categoryId"),
    __metadata("design:type", category_1.Category)
], Post.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => comment_1.Comment),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => tag_1.Tag, () => post_tag_1.PostTag, "postId", "tagId"),
    __metadata("design:type", Array)
], Post.prototype, "tags", void 0);
Post = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: "post",
        modelName: "Post",
    })
], Post);
exports.Post = Post;

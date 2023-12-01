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
exports.DocumentFile = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const category_1 = require("./category");
const tag_1 = require("./tag");
const document_tag_1 = require("./document-tag");
let DocumentFile = class DocumentFile extends sequelize_typescript_1.Model {
    title;
    slug;
    description;
    fileUrl;
    uploadDate;
    userId;
    categoryId;
    category;
    user;
    tags;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], DocumentFile.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], DocumentFile.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], DocumentFile.prototype, "slug", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], DocumentFile.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], DocumentFile.prototype, "fileUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], DocumentFile.prototype, "uploadDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User) // foreign key
    ,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], DocumentFile.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_1.Category) // foreign key
    ,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], DocumentFile.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_1.Category, "categoryId"),
    __metadata("design:type", category_1.Category)
], DocumentFile.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User, "userId"),
    __metadata("design:type", user_1.User)
], DocumentFile.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => tag_1.Tag, () => document_tag_1.DocumentTag, "documentId", "tagId"),
    __metadata("design:type", Array)
], DocumentFile.prototype, "tags", void 0);
DocumentFile = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: "document",
        modelName: "Document",
    })
], DocumentFile);
exports.DocumentFile = DocumentFile;

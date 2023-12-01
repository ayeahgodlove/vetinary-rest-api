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
exports.ProductTag = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_1 = require("./product");
const tag_1 = require("./tag");
let ProductTag = class ProductTag extends sequelize_typescript_1.Model {
    productId;
    tagId;
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_1.Product),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductTag.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => tag_1.Tag),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductTag.prototype, "tagId", void 0);
ProductTag = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: "productTag",
        modelName: "ProductTag",
    })
], ProductTag);
exports.ProductTag = ProductTag;

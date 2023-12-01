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
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_image_1 = require("./product-image");
const store_1 = require("./store");
const category_1 = require("./category");
const review_1 = require("./review");
const tag_1 = require("./tag");
const product_tag_1 = require("./product-tag");
const order_1 = require("./order");
const product_order_1 = require("./product-order");
let Product = class Product extends sequelize_typescript_1.Model {
    categoryId;
    storeId;
    name;
    amount;
    shortDescription;
    description;
    qtty;
    reviews;
    tags;
    // relationships
    productImages;
    store;
    // one-to-one relationships
    category;
    orders;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        references: {
            model: category_1.Category,
            key: "id",
        },
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => category_1.Category),
    __metadata("design:type", String)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_1.Store) // foreign key
    ,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Product.prototype, "storeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL,
        allowNull: false,
        unique: false,
    }),
    __metadata("design:type", Number)
], Product.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "shortDescription", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", Number)
], Product.prototype, "qtty", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => review_1.Review),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => tag_1.Tag, () => product_tag_1.ProductTag),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_image_1.ProductImage),
    __metadata("design:type", Array)
], Product.prototype, "productImages", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_1.Store, "storeId"),
    __metadata("design:type", store_1.Store)
], Product.prototype, "store", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_1.Category),
    __metadata("design:type", category_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => order_1.Order, () => product_order_1.ProductOrder),
    __metadata("design:type", Array)
], Product.prototype, "orders", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: "product",
    })
], Product);
exports.Product = Product;

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
exports.Store = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_1 = require("./product");
const branch_1 = require("./branch");
const user_1 = require("./user");
const user_store_1 = require("./user-store");
let Store = class Store extends sequelize_typescript_1.Model {
    userId;
    name;
    location;
    imageBannerUrl;
    // relationships
    products;
    branches;
    users;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User) // foreign key
    ,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(128),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Store.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        unique: false,
    }),
    __metadata("design:type", String)
], Store.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "imageBannerUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_1.Product),
    __metadata("design:type", Array)
], Store.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => branch_1.Branch),
    __metadata("design:type", Array)
], Store.prototype, "branches", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_1.User, () => user_store_1.UserStore),
    __metadata("design:type", Array)
], Store.prototype, "users", void 0);
Store = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: "store",
    })
], Store);
exports.Store = Store;

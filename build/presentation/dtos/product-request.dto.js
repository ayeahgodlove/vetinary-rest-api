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
exports.ProductRequestDto = void 0;
const class_validator_1 = require("class-validator");
const product_1 = require("../../domain/models/product");
const nanoid_1 = require("nanoid");
class ProductRequestDto {
    name;
    description;
    shortDescription;
    // @IsNumber()
    amount;
    // @IsNumber()
    qtty;
    categoryId;
    storeId;
    // @IsNotEmpty()
    // @IsArray()
    // productImages: string[];
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.shortDescription = data.shortDescription;
        this.amount = data.amount;
        this.qtty = data.qtty;
        this.categoryId = data.categoryId;
        this.storeId = data.storeId;
    }
    toData() {
        return {
            ...product_1.emptyProduct,
            id: (0, nanoid_1.nanoid)(10),
            name: this.name,
            description: this.description,
            shortDescription: this.shortDescription,
            amount: Number(this.amount),
            qtty: Number(this.qtty),
            categoryId: this.categoryId,
            storeId: this.storeId,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            shortDescription: data.shortDescription,
            amount: Number(data.amount),
            qtty: Number(data.qtty),
            categoryId: data.categoryId,
            storeId: data.storeId,
            productImages: data.productImages,
            reviews: data.reviews,
            tags: data.tags,
            orders: data.orders,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 128),
    __metadata("design:type", String)
], ProductRequestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductRequestDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductRequestDto.prototype, "shortDescription", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
    // @IsNumber()
    ,
    __metadata("design:type", Number)
], ProductRequestDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
    // @IsNumber()
    ,
    __metadata("design:type", Number)
], ProductRequestDto.prototype, "qtty", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductRequestDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductRequestDto.prototype, "storeId", void 0);
exports.ProductRequestDto = ProductRequestDto;

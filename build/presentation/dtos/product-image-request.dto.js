"use strict";
// src/presentation/dtos/productImage-request.dto.ts
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
exports.ProductImageRequestDto = void 0;
const class_validator_1 = require("class-validator");
const product_image_1 = require("../../domain/models/product-image");
const nanoid_1 = require("nanoid");
class ProductImageRequestDto {
    productName;
    productId;
    constructor(data) {
        this.productName = data.productName;
        this.productId = data.productId;
    }
    toData() {
        return {
            ...product_image_1.emptyProductImage,
            id: (0, nanoid_1.nanoid)(10),
            productName: this.productName,
            productId: this.productId,
        };
    }
    toArrayData() {
        return [this.toData()];
    }
    toUpdateData(data) {
        return {
            id: data.id,
            productId: data.productId,
            productName: data.productName,
            imageUrl: data.imageUrl,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 255),
    __metadata("design:type", String)
], ProductImageRequestDto.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductImageRequestDto.prototype, "productId", void 0);
exports.ProductImageRequestDto = ProductImageRequestDto;

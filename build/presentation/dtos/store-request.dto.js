"use strict";
// src/presentation/dtos/store-request.dto.ts
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
exports.StoreRequestDto = void 0;
const class_validator_1 = require("class-validator");
const store_1 = require("../../domain/models/store");
const nanoid_1 = require("nanoid");
class StoreRequestDto {
    name;
    location;
    constructor(data) {
        this.name = data.name;
        this.location = data.location;
    }
    toData() {
        return {
            ...store_1.emptyStore,
            id: (0, nanoid_1.nanoid)(10),
            name: this.name,
            location: this.location,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            name: data.name,
            location: data.location,
            imageBannerUrl: data.imageBannerUrl,
            userId: data.userId
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 128),
    __metadata("design:type", String)
], StoreRequestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 128),
    __metadata("design:type", String)
], StoreRequestDto.prototype, "location", void 0);
exports.StoreRequestDto = StoreRequestDto;

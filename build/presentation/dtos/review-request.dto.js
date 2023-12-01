"use strict";
// src/presentation/dtos/review-request.dto.ts
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
exports.ReviewRequestDto = void 0;
const class_validator_1 = require("class-validator");
const review_1 = require("../../domain/models/review");
const nanoid_1 = require("nanoid");
class ReviewRequestDto {
    userId;
    rating;
    comment;
    constructor(data) {
        this.userId = data.userId;
        this.rating = data.rating;
        this.comment = data.comment;
    }
    toData() {
        return {
            ...review_1.emptyReview,
            id: (0, nanoid_1.nanoid)(10),
            comment: this.comment,
            rating: this.rating,
            userId: this.userId,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            comment: data.comment,
            rating: data.rating,
            userId: data.userId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReviewRequestDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReviewRequestDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReviewRequestDto.prototype, "comment", void 0);
exports.ReviewRequestDto = ReviewRequestDto;

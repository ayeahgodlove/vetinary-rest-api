"use strict";
// src/presentation/dtos/post-request.dto.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRequestDto = void 0;
const class_validator_1 = require("class-validator");
const post_1 = require("../../domain/models/post");
const slugify_1 = __importDefault(require("slugify"));
const nanoid_1 = require("nanoid");
class PostRequestDto {
    // @Length(10, 128)
    title;
    content;
    categoryId;
    constructor(data) {
        this.title = data.title;
        this.content = data.content;
        // this.imageUrl = data.imageUrl;
        this.categoryId = data.categoryId;
    }
    toData() {
        return {
            ...post_1.emptyPost,
            id: (0, nanoid_1.nanoid)(10),
            slug: (0, slugify_1.default)(this.title, { lower: true, replacement: "-" }),
            title: this.title,
            content: this.content,
            categoryId: this.categoryId,
            // imageUrl: this.imageUrl, 
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            title: data.title,
            authorId: data.authorId,
            categoryId: data.categoryId,
            content: data.content,
            imageUrl: data.imageUrl,
            publishedAt: data.publishedAt,
            slug: data.slug,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
    // @Length(10, 128)
    ,
    __metadata("design:type", String)
], PostRequestDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostRequestDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostRequestDto.prototype, "categoryId", void 0);
exports.PostRequestDto = PostRequestDto;

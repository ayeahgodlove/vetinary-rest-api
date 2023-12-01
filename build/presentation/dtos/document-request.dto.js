"use strict";
// src/presentation/dtos/document-request.dto.ts
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
exports.DocumentRequestDto = void 0;
const class_validator_1 = require("class-validator");
const document_1 = require("../../domain/models/document");
const slugify_1 = __importDefault(require("slugify"));
const nanoid_1 = require("nanoid");
class DocumentRequestDto {
    title;
    description;
    // @IsNotEmpty()
    // @IsString()
    // fileUrl: string;
    categoryId;
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        // this.fileUrl = data.fileUrl;
        this.categoryId = data.categoryId;
    }
    toData() {
        return {
            ...document_1.emptyDocument,
            id: (0, nanoid_1.nanoid)(10),
            slug: (0, slugify_1.default)(this.title, { lower: true, replacement: "-" }),
            title: this.title,
            description: this.description,
            categoryId: this.categoryId,
            // fileUrl: this.fileUrl, 
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            title: data.title,
            userId: data.userId,
            categoryId: data.categoryId,
            description: data.description,
            fileUrl: data.fileUrl,
            uploadDate: data.uploadDate,
            slug: data.slug,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 128),
    __metadata("design:type", String)
], DocumentRequestDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocumentRequestDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocumentRequestDto.prototype, "categoryId", void 0);
exports.DocumentRequestDto = DocumentRequestDto;

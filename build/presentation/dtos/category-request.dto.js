"use strict";
// src/presentation/dtos/category-request.dto.ts
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
exports.CategoryRequestDto = void 0;
const class_validator_1 = require("class-validator");
const category_1 = require("../../domain/models/category");
const slugify_1 = __importDefault(require("slugify"));
const nanoid_1 = require("nanoid");
class CategoryRequestDto {
    name;
    description;
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
    }
    toData() {
        return {
            ...category_1.emptyCategory,
            id: (0, nanoid_1.nanoid)(10),
            slug: (0, slugify_1.default)(this.name, { lower: true, replacement: "-" }),
            name: this.name,
            description: this.description,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 25),
    __metadata("design:type", String)
], CategoryRequestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategoryRequestDto.prototype, "description", void 0);
exports.CategoryRequestDto = CategoryRequestDto;

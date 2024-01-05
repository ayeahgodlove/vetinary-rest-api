"use strict";
// src/presentation/dtos/course-request.dto.ts
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
exports.CourseRequestDto = void 0;
const class_validator_1 = require("class-validator");
const nanoid_1 = require("nanoid");
const course_1 = require("../../../domain/models/lms/course");
class CourseRequestDto {
    title;
    description;
    authorId;
    // @IsNumber()
    price;
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.authorId = data.authorId;
        this.price = data.price;
    }
    toData() {
        return {
            ...course_1.emptyCourse,
            id: (0, nanoid_1.nanoid)(10),
            title: this.title,
            description: this.description,
            authorId: this.authorId,
            price: Number(this.price),
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            authorId: data.authorId,
            courseImage: data.courseImage,
            price: Number(data.price),
            completionDate: data.completionDate,
            startDate: data.startDate
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CourseRequestDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CourseRequestDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CourseRequestDto.prototype, "authorId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
    // @IsNumber()
    ,
    __metadata("design:type", Number)
], CourseRequestDto.prototype, "price", void 0);
exports.CourseRequestDto = CourseRequestDto;

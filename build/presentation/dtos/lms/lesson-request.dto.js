"use strict";
// src/presentation/dtos/lesson-request.dto.ts
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
exports.LessonRequestDto = void 0;
const class_validator_1 = require("class-validator");
const nanoid_1 = require("nanoid");
const lesson_1 = require("../../../domain/models/lms/lesson");
class LessonRequestDto {
    title;
    description;
    authorId;
    content;
    duration;
    difficulty;
    author;
    prerequisites;
    objectives;
    keywords;
    courseId;
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.authorId = data.authorId;
        this.content = data.content;
        this.duration = data.duration;
        this.difficulty = data.difficulty;
        this.prerequisites = data.prerequisites;
        this.objectives = data.objectives;
        this.keywords = data.keywords;
        this.author = data.author;
        this.courseId = data.courseId;
    }
    toData() {
        return {
            ...lesson_1.emptyLesson,
            id: (0, nanoid_1.nanoid)(10),
            title: this.title,
            description: this.description,
            authorId: this.authorId,
            content: this.content,
            difficulty: this.difficulty,
            duration: this.duration,
            prerequisites: this.prerequisites,
            objectives: this.objectives,
            keywords: this.keywords,
            author: this.author,
            courseId: this.courseId
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            authorId: data.authorId,
            content: data.content,
            duration: data.duration,
            prerequisites: data.prerequisites,
            objectives: data.objectives,
            keywords: data.keywords,
            difficulty: data.difficulty,
            author: data.author,
            courseId: data.courseId
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LessonRequestDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LessonRequestDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LessonRequestDto.prototype, "authorId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LessonRequestDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LessonRequestDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LessonRequestDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LessonRequestDto.prototype, "author", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], LessonRequestDto.prototype, "prerequisites", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], LessonRequestDto.prototype, "objectives", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], LessonRequestDto.prototype, "keywords", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LessonRequestDto.prototype, "courseId", void 0);
exports.LessonRequestDto = LessonRequestDto;

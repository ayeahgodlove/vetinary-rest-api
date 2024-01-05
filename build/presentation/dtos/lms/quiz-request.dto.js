"use strict";
// src/presentation/dtos/quiz-request.dto.ts
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
exports.QuizRequestDto = void 0;
const class_validator_1 = require("class-validator");
const nanoid_1 = require("nanoid");
const quiz_1 = require("../../../domain/models/lms/quiz");
class QuizRequestDto {
    question;
    lessonId;
    answers;
    correctAnswerIndex;
    constructor(data) {
        this.question = data.question;
        this.answers = data.answers;
        this.correctAnswerIndex = data.correctAnswerIndex;
        this.lessonId = data.lessonId;
    }
    toData() {
        return {
            ...quiz_1.emptyQuiz,
            id: (0, nanoid_1.nanoid)(10),
            question: this.question,
            answers: this.answers,
            correctAnswerIndex: this.correctAnswerIndex,
            lessonId: this.lessonId,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            question: data.question,
            answers: data.answers,
            correctAnswerIndex: data.correctAnswerIndex,
            lessonId: data.lessonId,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizRequestDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizRequestDto.prototype, "lessonId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], QuizRequestDto.prototype, "answers", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuizRequestDto.prototype, "correctAnswerIndex", void 0);
exports.QuizRequestDto = QuizRequestDto;

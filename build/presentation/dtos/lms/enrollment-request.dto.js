"use strict";
// src/presentation/dtos/enrollment-request.dto.ts
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
exports.EnrollmentRequestDto = void 0;
const class_validator_1 = require("class-validator");
const nanoid_1 = require("nanoid");
const enrollment_1 = require("../../../domain/models/lms/enrollment");
class EnrollmentRequestDto {
    userId;
    courseId;
    // @IsNotEmpty()
    // @IsDate()
    // completionDate: Date;
    // @IsNotEmpty()
    // @IsDate()
    // enrollmentDate: Date;
    constructor(data) {
        this.userId = data.userId;
        this.courseId = data.courseId;
        // this.completionDate = data.completionDate;
        // this.enrollmentDate = data.enrollmentDate;
    }
    toData() {
        return {
            ...enrollment_1.emptyEnrollment,
            id: (0, nanoid_1.nanoid)(10),
            userId: this.userId,
            courseId: this.courseId,
            // completionDate: this.completionDate,
            // enrollmentDate: this.enrollmentDate,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            userId: data.userId,
            courseId: data.courseId,
            completionDate: data.completionDate,
            enrollmentDate: data.enrollmentDate,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnrollmentRequestDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnrollmentRequestDto.prototype, "courseId", void 0);
exports.EnrollmentRequestDto = EnrollmentRequestDto;

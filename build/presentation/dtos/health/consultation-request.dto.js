"use strict";
// src/presentation/dtos/consultation-request.dto.ts
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
exports.ConsultationRequestDto = void 0;
const class_validator_1 = require("class-validator");
const nanoid_1 = require("nanoid");
const consultation_1 = require("../../../domain/models/health/consultation");
class ConsultationRequestDto {
    petOwnerId;
    vetDoctorId;
    diagnosis;
    constructor(data) {
        this.petOwnerId = data.petOwnerId;
        this.vetDoctorId = data.vetDoctorId;
        this.diagnosis = data.diagnosis;
    }
    toData() {
        return {
            ...consultation_1.emptyConsultation,
            id: (0, nanoid_1.nanoid)(10),
            petOwnerId: this.petOwnerId,
            vetDoctorId: this.vetDoctorId,
            diagnosis: this.diagnosis,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            petOwnerId: data.petOwnerId,
            vetDoctorId: data.vetDoctorId,
            diagnosis: data.diagnosis,
            endDate: data.endDate,
            startDate: data.startDate,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConsultationRequestDto.prototype, "petOwnerId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConsultationRequestDto.prototype, "vetDoctorId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConsultationRequestDto.prototype, "diagnosis", void 0);
exports.ConsultationRequestDto = ConsultationRequestDto;

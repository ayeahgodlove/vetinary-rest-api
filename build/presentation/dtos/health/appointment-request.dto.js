"use strict";
// src/presentation/dtos/appointment-request.dto.ts
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
exports.AppointmentRequestDto = void 0;
const class_validator_1 = require("class-validator");
const nanoid_1 = require("nanoid");
const appointment_1 = require("../../../domain/models/health/appointment");
class AppointmentRequestDto {
    petOwnerId;
    vetDoctorId;
    constructor(data) {
        this.petOwnerId = data.petOwnerId;
        this.vetDoctorId = data.vetDoctorId;
    }
    toData() {
        return {
            ...appointment_1.emptyAppointment,
            id: (0, nanoid_1.nanoid)(10),
            petOwnerId: this.petOwnerId,
            vetDoctorId: this.vetDoctorId,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            petOwnerId: data.petOwnerId,
            vetDoctorId: data.vetDoctorId,
            appointmentDateTime: data.appointmentDateTime,
            durationMinutes: data.durationMinutes,
            isConfirmed: data.isConfirmed
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentRequestDto.prototype, "petOwnerId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentRequestDto.prototype, "vetDoctorId", void 0);
exports.AppointmentRequestDto = AppointmentRequestDto;

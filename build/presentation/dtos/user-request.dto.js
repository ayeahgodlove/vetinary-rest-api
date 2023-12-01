"use strict";
// src/presentation/dtos/user-request.dto.ts
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
exports.UserRequestDto = void 0;
const class_validator_1 = require("class-validator");
const user_1 = require("../../domain/models/user");
const nanoid_1 = require("nanoid");
class UserRequestDto {
    username;
    firstname;
    lastname;
    email;
    phoneNumber;
    password;
    constructor(data) {
        this.username = data.username;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.username = data.username;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.password = data.password;
    }
    toData() {
        return {
            ...user_1.emptyUser,
            id: (0, nanoid_1.nanoid)(15),
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phoneNumber: this.phoneNumber,
            password: this.password,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            address: data.address,
            city: data.city,
            country: data.country,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            authStrategy: data.authStrategy,
            avatar: data.avatar,
            verified: data.verified
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 25),
    __metadata("design:type", String)
], UserRequestDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 25),
    __metadata("design:type", String)
], UserRequestDto.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 25),
    __metadata("design:type", String)
], UserRequestDto.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(9),
    __metadata("design:type", String)
], UserRequestDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8),
    __metadata("design:type", String)
], UserRequestDto.prototype, "password", void 0);
exports.UserRequestDto = UserRequestDto;

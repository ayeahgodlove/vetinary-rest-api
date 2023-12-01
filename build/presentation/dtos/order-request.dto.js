"use strict";
// src/presentation/dtos/OrderRequestDto.ts
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
exports.OrderRequestDto = void 0;
const class_validator_1 = require("class-validator");
const order_1 = require("../../domain/models/order");
const uuid_1 = require("uuid");
class OrderRequestDto {
    status;
    orderNo;
    constructor(data) {
        this.status = data.status;
        this.orderNo = data.orderNo;
        // this.totalAmount = data.totalAmount;
        // this.totalQtty = data.totalQtty
    }
    toData(totalAmount, totalQtty) {
        return {
            ...order_1.emptyOrder,
            id: (0, uuid_1.v4)(),
            orderNo: this.orderNo,
            status: this.status,
            totalAmount: totalAmount,
            totalQtty: totalQtty
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            orderNo: data.orderNo,
            status: data.status,
            totalAmount: data.totalAmount,
            userId: data.userId,
            totalQtty: data.totalQtty,
            products: data.products,
            address: data.address,
            cellPhone: data.cellPhone,
            email: data.email,
            username: data.username
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderRequestDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderRequestDto.prototype, "orderNo", void 0);
exports.OrderRequestDto = OrderRequestDto;

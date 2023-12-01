"use strict";
// src/presentation/dtos/userDoc-request.dto.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDocRequestDto = void 0;
const user_doc_1 = require("../../domain/models/user-doc");
const nanoid_1 = require("nanoid");
class UserDocRequestDto {
    // @IsNotEmpty()
    // @IsString()
    userId;
    // @IsNotEmpty()
    // @IsString()
    scannedIdCard;
    // @IsNotEmpty()
    // @IsString()
    scannedLiscence;
    constructor(data) {
        this.userId = data.userId;
        this.scannedIdCard = data.scannedIdCard;
        this.scannedLiscence = data.scannedLiscence;
    }
    toData() {
        return {
            ...user_doc_1.emptyUserDoc,
            id: (0, nanoid_1.nanoid)(10),
            userId: this.userId,
            scannedIdCard: this.scannedIdCard,
            scannedLiscence: this.scannedLiscence,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            userId: data.userId,
            scannedIdCard: data.scannedIdCard,
            scannedLiscence: data.scannedLiscence,
        };
    }
}
exports.UserDocRequestDto = UserDocRequestDto;

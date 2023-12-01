"use strict";
// src/domain/exceptions/invalid-phone.exception.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPhoneException = void 0;
class InvalidPhoneException extends Error {
    constructor(phone) {
        super(`Invalid phone: ${phone}`);
        this.name = 'InvalidphoneException';
    }
}
exports.InvalidPhoneException = InvalidPhoneException;

"use strict";
// src/domain/exceptions/invalid-email.exception.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEmailException = void 0;
class InvalidEmailException extends Error {
    constructor(email) {
        super(`Invalid email: ${email}`);
        this.name = 'InvalidEmailException';
    }
}
exports.InvalidEmailException = InvalidEmailException;

"use strict";
// src/domain/exceptions/validation.exception.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
class ValidationException extends Error {
    constructor(errors) {
        super(`Validation failed: ${errors.join(', ')}`);
        this.name = 'ValidationException';
    }
}
exports.ValidationException = ValidationException;

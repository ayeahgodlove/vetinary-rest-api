"use strict";
// src/domain/exceptions/unauthorized.exception.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
class UnauthorizedException extends Error {
    constructor(message) {
        super(`Unauthorized: ${message}`);
        this.name = 'UnauthorizedException';
    }
}
exports.UnauthorizedException = UnauthorizedException;

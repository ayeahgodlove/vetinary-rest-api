"use strict";
// src/common/http-exception.ts
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    statusCode;
    status;
    message;
    error;
    constructor(statusCode, message, error) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = HttpException;

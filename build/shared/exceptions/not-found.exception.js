"use strict";
// src/domain/exceptions/not-found.exception.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
class NotFoundException extends Error {
    constructor(entity, id) {
        super(`${entity} with id ${id} not found!`);
        this.name = 'NotFoundException';
    }
}
exports.NotFoundException = NotFoundException;

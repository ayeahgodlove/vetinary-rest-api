"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { printf, combine, colorize, errors, timestamp } = winston_1.format;
const logFormat = printf(({ level, timestamp, message, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(colorize(), errors({ stack: true }), timestamp(), logFormat),
    transports: [new winston_1.transports.Console()],
});

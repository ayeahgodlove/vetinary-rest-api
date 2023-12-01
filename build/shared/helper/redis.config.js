"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const redisClient = new ioredis_1.default({
    host: 'localhost',
    port: 6379
});
exports.store = new RedisStore({
    // client: redisClient,
    // ttl: 3600,
    url: `${process.env.REDIS_URL}`
});

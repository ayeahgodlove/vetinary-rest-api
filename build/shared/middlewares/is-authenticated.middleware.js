"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
const isAuthenticatedMiddleware = (req, res, next) => {
    passport_1.default.authenticate("jwt", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        req.user = user; // Attach the user object to the request
        next();
    })(req, res, next);
};
exports.isAuthenticatedMiddleware = isAuthenticatedMiddleware;

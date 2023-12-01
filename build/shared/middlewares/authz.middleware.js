"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = exports.jwtOptions = exports.SECRET_KEY = void 0;
const passport_jwt_1 = require("passport-jwt");
const user_1 = require("../../data/entities/user");
const passport_1 = __importDefault(require("passport"));
exports.SECRET_KEY = 'mysecretkey';
exports.jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: exports.SECRET_KEY, // Replace with your actual secret key
};
exports.header = {
    alg: 'HS256',
    typ: 'JWT'
};
passport_1.default.use(new passport_jwt_1.Strategy(exports.jwtOptions, async (jwtPayload, done) => {
    try {
        // Find the user associated with the JWT token
        const user = await user_1.User.findByPk(jwtPayload.id);
        if (user) {
            // If the user exists, return them
            return done(null, user);
        }
        else {
            return done(null, false, { message: "Invalid username or password!" });
        }
    }
    catch (error) {
        return done(error, false, { message: "Invalid username or password!" });
    }
}));
exports.default = passport_1.default;

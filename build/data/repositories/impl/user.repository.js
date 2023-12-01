"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_1 = require("../../entities/user");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a User as parameter
     * @user
     * returns void
     */
    async create(user) {
        const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
        user.password = hashedPassword;
        user.authStrategy = 'local-auth';
        // user.phoneNumber = user.whatsappNumber
        try {
            return await user_1.User.create(user);
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns User
     */
    async findById(id) {
        try {
            const userItem = await user_1.User.findByPk(id);
            if (!userItem) {
                throw new not_found_exception_1.NotFoundException("User", id);
            }
            return userItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns User
     */
    async findByName(name) {
        try {
            const userItem = await user_1.User.findOne({ where: { username: name } });
            return userItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of User
     */
    async getAll() {
        try {
            const users = await user_1.User.findAll();
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a User as parameter
     * @user
     * returns void
     */
    async update(user) {
        const { id } = user;
        try {
            const userItem = await user_1.User.findByPk(id);
            console.log(user);
            if (!userItem) {
                throw new not_found_exception_1.NotFoundException("User", id.toString());
            }
            const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
            user.password = hashedPassword;
            return await userItem.update({ ...user });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const userItem = await user_1.User.findByPk(id);
            if (!userItem) {
                throw new not_found_exception_1.NotFoundException("User", id);
            }
            await userItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserRepository = UserRepository;

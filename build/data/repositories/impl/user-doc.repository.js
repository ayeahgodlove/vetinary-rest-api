"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDocRepository = void 0;
const user_doc_1 = require("../../entities/user-doc");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class UserDocRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a UserDoc as parameter
     * @userDoc
     * returns void
     */
    async create(userDoc) {
        try {
            return await user_doc_1.UserDoc.create({ ...userDoc });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns UserDoc
     */
    async findById(id) {
        try {
            const userDocItem = await user_doc_1.UserDoc.findByPk(id);
            if (!userDocItem) {
                throw new not_found_exception_1.NotFoundException("UserDoc", id);
            }
            return userDocItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns UserDoc
     */
    async findByName(userId) {
        try {
            const userDocItem = await user_doc_1.UserDoc.findOne({ where: { userId } });
            return userDocItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of UserDoc
     */
    async getAll() {
        try {
            const userDocs = await user_doc_1.UserDoc.findAll();
            return userDocs;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a UserDoc as parameter
     * @userDoc
     * returns void
     */
    async update(userDoc) {
        const { id } = userDoc;
        try {
            const userDocItem = await user_doc_1.UserDoc.findByPk(id);
            console.log(userDoc);
            if (!userDocItem) {
                throw new not_found_exception_1.NotFoundException("UserDoc", id.toString());
            }
            return await userDocItem.update({ ...userDoc });
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
            const userDocItem = await user_doc_1.UserDoc.findByPk(id);
            if (!userDocItem) {
                throw new not_found_exception_1.NotFoundException("UserDoc", id);
            }
            await userDocItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserDocRepository = UserDocRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRepository = void 0;
const tag_1 = require("../../entities/tag");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class TagRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Tag as parameter
     * @tag
     * returns void
     */
    async create(tag) {
        try {
            return await tag_1.Tag.create({ ...tag });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Tag
     */
    async findById(id) {
        try {
            const tagItem = await tag_1.Tag.findByPk(id);
            if (!tagItem) {
                throw new not_found_exception_1.NotFoundException("Tag", id);
            }
            return tagItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Tag
     */
    async findByName(name) {
        try {
            const tagItem = await tag_1.Tag.findOne({ where: { name } });
            return tagItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Tag
     */
    async getAll() {
        try {
            const tags = await tag_1.Tag.findAll();
            return tags;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Tag as parameter
     * @tag
     * returns void
     */
    async update(tag) {
        const { id } = tag;
        try {
            const tagItem = await tag_1.Tag.findByPk(id);
            console.log(tag);
            if (!tagItem) {
                throw new not_found_exception_1.NotFoundException("Tag", id.toString());
            }
            return await tagItem.update({ ...tag });
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
            const tagItem = await tag_1.Tag.findByPk(id);
            if (!tagItem) {
                throw new not_found_exception_1.NotFoundException("Tag", id);
            }
            await tagItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.TagRepository = TagRepository;

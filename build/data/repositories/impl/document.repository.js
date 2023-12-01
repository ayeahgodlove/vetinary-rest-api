"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRepository = void 0;
const document_1 = require("../../entities/document");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class DocumentRepository {
    /**
     *
     */
    constructor() { }
    findByName(name) {
        throw new Error("Method not implemented.");
    }
    /**
     * Receives a Document as parameter
     * @document
     * returns void
     */
    async create(document) {
        try {
            return await document_1.DocumentFile.create({ ...document });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Document
     */
    async findById(id) {
        try {
            const documentItem = await document_1.DocumentFile.findByPk(id);
            if (!documentItem) {
                throw new not_found_exception_1.NotFoundException("Document", id);
            }
            return documentItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @title
     * returns Category
     */
    async findByTitle(title) {
        try {
            const document = await document_1.DocumentFile.findOne({ where: { title } });
            return document;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Document
     */
    async getAll() {
        try {
            const categories = await document_1.DocumentFile.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Document as parameter
     * @document
     * returns void
     */
    async update(document) {
        const { id } = document;
        try {
            const documentItem = await document_1.DocumentFile.findByPk(id);
            console.log(document);
            if (!documentItem) {
                throw new not_found_exception_1.NotFoundException("Document", id.toString());
            }
            return await documentItem.update({ ...document });
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
            const documentItem = await document_1.DocumentFile.findByPk(id);
            if (!documentItem) {
                throw new not_found_exception_1.NotFoundException("Document", id);
            }
            await documentItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.DocumentRepository = DocumentRepository;

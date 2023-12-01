"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentUseCase = void 0;
const slugify_1 = __importDefault(require("slugify"));
class DocumentUseCase {
    documentRepository;
    /**
     *
     */
    constructor(documentRepository) {
        this.documentRepository = documentRepository;
    }
    async createDocument(document) {
        const existingDocument = await this.documentRepository.findByTitle(document.title);
        if (existingDocument) {
            throw new Error("Document already exists");
        }
        // const _document = new Document({document});
        //because it's already done in the Repository
        return this.documentRepository.create(document);
    }
    async getAll() {
        return this.documentRepository.getAll();
    }
    async getDocumentById(id) {
        return this.documentRepository.findById(id);
    }
    async updateDocument(document) {
        const obj = {
            ...document,
            slug: (0, slugify_1.default)(document.title, { lower: true, replacement: "-" }),
        };
        return this.documentRepository.update(obj);
    }
    async deleteDocument(id) {
        return this.documentRepository.delete(id);
    }
}
exports.DocumentUseCase = DocumentUseCase;

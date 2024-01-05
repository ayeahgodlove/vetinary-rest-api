"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const document_1 = require("../../domain/models/document");
const document_usecase_1 = require("../../domain/usecases/document.usecase");
const document_repository_1 = require("../../data/repositories/impl/document.repository");
const mapper_1 = require("../mappers/mapper");
const document_request_dto_1 = require("../dtos/document-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const path_1 = __importDefault(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
const documentRepository = new document_repository_1.DocumentRepository();
const documentUseCase = new document_usecase_1.DocumentUseCase(documentRepository);
const documentMapper = new mapper_1.DocumentMapper();
class DocumentsController {
    async createDocument(req, res) {
        const dto = new document_request_dto_1.DocumentRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        const user = req.user;
        const { filename } = req.file;
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const documentResponse = await documentUseCase.createDocument({
                    ...dto.toData(),
                    userId: user.id,
                    fileUrl: filename.toString(),
                });
                res.status(201).json({
                    data: documentResponse.toJSON(),
                    message: "Document created Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [],
                    success: false,
                });
            }
        }
    }
    async getAll(req, res) {
        try {
            const documents = await documentUseCase.getAll();
            const documentsDTO = documentMapper.toDTOs(documents);
            res.json({
                data: documentsDTO,
                message: "Success",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async getDocumentById(req, res) {
        try {
            const id = req.params.id;
            const document = await documentUseCase.getDocumentById(id);
            if (!document) {
                throw new not_found_exception_1.NotFoundException("Document", id);
            }
            const documentDTO = documentMapper.toDTO(document);
            res.json({
                data: documentDTO,
                message: "Success",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async updateDocument(req, res) {
        const dto = new document_request_dto_1.DocumentRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        const user = req.user;
        const { filename } = req.file;
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const id = req.params.id;
                const obj = {
                    ...document_1.emptyDocument,
                    ...req.body,
                    id: id,
                    userId: user.id,
                    fileUrl: filename.toString(),
                };
                const updatedDocument = await documentUseCase.updateDocument(obj);
                const documentDto = documentMapper.toDTO(updatedDocument);
                res.json({
                    data: documentDto,
                    message: "Document Updated Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [error],
                    success: false,
                });
            }
        }
    }
    async deleteDocument(req, res) {
        try {
            const id = req.params.id;
            const document = await documentUseCase.getDocumentById(id);
            if (document) {
                const baseDirectory = "./public/uploads/documents";
                const filePath = path_1.default.join(baseDirectory, document.dataValues.fileUrl);
                rimraf_1.default.sync(filePath);
            }
            await documentUseCase.deleteDocument(id);
            res.status(204).json({
                message: `Operation successfully completed!`,
                validationErrors: [],
                success: true,
                data: null,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                data: null,
                validationErrors: [error],
                success: true,
            });
        }
    }
}
exports.DocumentsController = DocumentsController;

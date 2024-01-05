"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const product_1 = require("../../domain/models/product");
const product_usecase_1 = require("../../domain/usecases/product.usecase");
const product_repository_1 = require("../../data/repositories/impl/product.repository");
const mapper_1 = require("../mappers/mapper");
const product_request_dto_1 = require("../dtos/product-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const path_1 = __importDefault(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
const productRepository = new product_repository_1.ProductRepository();
const productUseCase = new product_usecase_1.ProductUseCase(productRepository);
const productMapper = new mapper_1.ProductMapper();
//product tags
class ProductsController {
    async createProduct(req, res) {
        const dto = new product_request_dto_1.ProductRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        const tags = JSON.parse(req.body.tags);
        if (!req.files) {
            throw new Error("Please select Images!");
        }
        const { productImages } = req.files;
        const productImagesStrArr = productImages.map((p) => p.filename);
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
                const productResponse = await productUseCase.createProduct({
                    ...dto.toData(),
                    tags,
                    productImages: productImagesStrArr,
                });
                const obj = {
                    ...productResponse.toJSON(),
                    reviews: [],
                };
                res.status(201).json({
                    data: obj,
                    message: "Product created Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                const baseDirectory = "./public/uploads/products";
                productImagesStrArr.forEach((filePath) => {
                    const fullPath = path_1.default.join(baseDirectory, filePath);
                    rimraf_1.default.sync(fullPath); // Delete each file using rimraf
                });
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
            const products = await productUseCase.getAll();
            const productsDTO = productMapper.toDTOs(products);
            res.json({
                data: productsDTO,
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
    async search(req, res) {
        try {
            const searchTerm = req.query.searchTerm;
            const products = await productUseCase.search(`${searchTerm}`);
            const productsDTO = productMapper.toDTOs(products);
            res.json({
                data: productsDTO,
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
    async getProductById(req, res) {
        try {
            const id = req.params.id;
            const product = await productUseCase.getProductById(id);
            if (!product) {
                throw new not_found_exception_1.NotFoundException("Product", id);
            }
            const productDTO = productMapper.toDTO(product);
            res.json({
                data: productDTO,
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
    async getProductsByCategory(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const products = await productUseCase.getProductsByCategory(categoryId);
            const productsDTO = productMapper.toDTOs(products);
            res.json({
                data: productsDTO,
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
    async updateProduct(req, res) {
        const dto = new product_request_dto_1.ProductRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
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
                    ...product_1.emptyProduct,
                    ...req.body,
                    id: id,
                };
                const updatedProduct = await productUseCase.updateProduct(obj);
                const productDto = productMapper.toDTO(updatedProduct);
                res.json({
                    data: productDto,
                    message: "Product Updated Successfully!",
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
    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await productUseCase.getProductById(id);
            if (product) {
                const baseDirectory = "./public/uploads/products";
                product.dataValues.productImages.forEach((filePath) => {
                    const fullPath = path_1.default.join(baseDirectory, filePath);
                    rimraf_1.default.sync(fullPath); // Delete each file using rimraf
                });
            }
            await productUseCase.deleteProduct(id);
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
exports.ProductsController = ProductsController;

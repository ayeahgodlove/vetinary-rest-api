"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const post_1 = require("../../domain/models/post");
const post_usecase_1 = require("../../domain/usecases/post.usecase");
const post_repository_1 = require("../../data/repositories/impl/post.repository");
const mapper_1 = require("../mappers/mapper");
const post_request_dto_1 = require("../dtos/post-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const path_1 = __importDefault(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
const postRepository = new post_repository_1.PostRepository();
const postUseCase = new post_usecase_1.PostUseCase(postRepository);
const postMapper = new mapper_1.PostMapper();
class PostsController {
    async createPost(req, res) {
        const dto = new post_request_dto_1.PostRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        const user = req.user;
        const { filename } = req.file;
        if (filename === undefined) {
            throw new Error("Photo not found!");
        }
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
                const postResponse = await postUseCase.createPost({
                    ...dto.toData(),
                    authorId: user.id,
                    imageUrl: filename.toString()
                });
                res.status(201).json({
                    data: postResponse.toJSON(),
                    message: "Post created Successfully!",
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
            const posts = await postUseCase.getAll();
            const postsDTO = postMapper.toDTOs(posts);
            res.json({
                data: postsDTO,
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
    async getPostById(req, res) {
        try {
            const id = req.params.id;
            const post = await postUseCase.getPostById(id);
            if (!post) {
                throw new not_found_exception_1.NotFoundException("Post", id);
            }
            const postDTO = postMapper.toDTO(post);
            res.json({
                data: postDTO,
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
    async updatePost(req, res) {
        const dto = new post_request_dto_1.PostRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        const { filename } = req.file;
        const user = req.user;
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
                    ...post_1.emptyPost,
                    ...req.body,
                    id: id,
                    imageUrl: filename.toString(),
                    authorId: user.id,
                };
                const updatedPost = await postUseCase.updatePost(obj);
                const postDto = postMapper.toDTO(updatedPost);
                res.json({
                    data: postDto,
                    success: true,
                    message: "Post Updated Successfully!",
                    validationErrors: [],
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
    async deletePost(req, res) {
        try {
            const id = req.params.id;
            const post = await postUseCase.getPostById(id);
            if (post) {
                const baseDirectory = "./public/uploads/posts";
                const filePath = path_1.default.join(baseDirectory, post.dataValues.imageUrl);
                rimraf_1.default.sync(filePath);
            }
            await postUseCase.deletePost(id);
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
exports.PostsController = PostsController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const comment_1 = require("../../domain/models/comment");
const comment_usecase_1 = require("../../domain/usecases/comment.usecase");
const comment_repository_1 = require("../../data/repositories/impl/comment.repository");
const mapper_1 = require("../mappers/mapper");
const comment_request_dto_1 = require("../dtos/comment-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const commentRepository = new comment_repository_1.CommentRepository();
const commentUseCase = new comment_usecase_1.CommentUseCase(commentRepository);
const commentMapper = new mapper_1.CommentMapper();
class CommentsController {
    async createComment(req, res) {
        const dto = new comment_request_dto_1.CommentRequestDto(req.body);
        const user = req.user;
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
                const commentResponse = await commentUseCase.createComment({
                    ...dto.toData(),
                    userId: user.id,
                    // parent_id: dto.parent_id ? dto.toData().parent_id : dto.toData().id
                });
                res.status(201).json({
                    data: commentResponse.toJSON(),
                    message: "Comment created Successfully!",
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
    async getPostComments(req, res) {
        const { postId } = req.params;
        try {
            const comments = await commentUseCase.getPostComments(postId);
            const commentsDTO = commentMapper.toDTOs(comments);
            res.json({
                data: commentsDTO,
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
    async updateComment(req, res) {
        const dto = new comment_request_dto_1.CommentRequestDto(req.body);
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
                const { id } = req.params;
                const user = req.user;
                const obj = {
                    ...comment_1.emptyComment,
                    ...req.body,
                    id,
                    userId: user.id
                };
                const updatedComment = await commentUseCase.updateComment(dto.toUpdateData(obj));
                const commentDto = commentMapper.toDTO(updatedComment);
                res.json({
                    data: commentDto,
                    message: "Comment Updated Successfully!",
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
    async deleteComment(req, res) {
        try {
            const { id } = req.params;
            await commentUseCase.deleteComment(id);
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
exports.CommentsController = CommentsController;

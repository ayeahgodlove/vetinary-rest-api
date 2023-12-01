"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentUseCase = void 0;
class CommentUseCase {
    commentRepository;
    /**
     *
     */
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async createComment(comment) {
        //because it's already done in the Repository
        return this.commentRepository.create(comment);
    }
    async getPostComments(postId) {
        return this.commentRepository.getPostComments(postId);
    }
    async updateComment(comment) {
        const obj = {
            ...comment,
        };
        return this.commentRepository.update(obj);
    }
    async deleteComment(id) {
        return this.commentRepository.delete(id);
    }
}
exports.CommentUseCase = CommentUseCase;

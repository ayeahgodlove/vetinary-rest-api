"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const comment_1 = require("../../entities/comment");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class CommentRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Comment as parameter
     * @comment
     * returns void
     */
    async create(comment) {
        try {
            return await comment_1.Comment.create({ ...comment });
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * get comments for a post
     */
    async getPostComments(postId) {
        try {
            const comments = await comment_1.Comment.findAll({
                where: {
                    postId: postId,
                },
                // include: [
                //   {
                //     model: User,
                //     attributes: ["id", "username", "email", "phoneNumber", "address"],
                //   },
                //   {
                //     model: Comment,
                //     as: "replies",
                //     include: [
                //       {
                //         model: User,
                //         attributes: [
                //           "id",
                //           "username",
                //           "email",
                //           "phoneNumber",
                //           "address",
                //         ],
                //       },
                //     ],
                //   },
                // ],
            });
            // const post = await Post.findByPk(postId, {
            //   include: [Comment],
            // });
            return comments;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Comment as parameter
     * @comment
     * returns void
     */
    async update(comment) {
        const { id } = comment;
        try {
            const commentItem = await comment_1.Comment.findByPk(id);
            if (!commentItem) {
                throw new not_found_exception_1.NotFoundException("Comment", id.toString());
            }
            return await commentItem.update({ ...comment });
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
            const commentItem = await comment_1.Comment.findByPk(id);
            if (!commentItem) {
                throw new not_found_exception_1.NotFoundException("Comment", id);
            }
            await commentItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CommentRepository = CommentRepository;

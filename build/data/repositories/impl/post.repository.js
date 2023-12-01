"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const post_1 = require("../../entities/post");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class PostRepository {
    /**
     *
     */
    constructor() { }
    findByName(name) {
        throw new Error("Method not implemented.");
    }
    /**
     * Receives a String as parameter
     * @title
     * returns Category
     */
    async findByTitle(title) {
        try {
            const post = await post_1.Post.findOne({ where: { title } });
            return post;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Post as parameter
     * @post
     * returns void
     */
    async create(post) {
        try {
            return await post_1.Post.create({ ...post });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Post
     */
    async findById(id) {
        try {
            const postItem = await post_1.Post.findByPk(id);
            if (!postItem) {
                throw new not_found_exception_1.NotFoundException("Post", id);
            }
            return postItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Post
     */
    async getAll() {
        try {
            const posts = await post_1.Post.findAll();
            return posts;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Post as parameter
     * @post
     * returns void
     */
    async update(post) {
        const { id } = post;
        try {
            const postItem = await post_1.Post.findByPk(id);
            console.log(post);
            if (!postItem) {
                throw new not_found_exception_1.NotFoundException("Post", id.toString());
            }
            return await postItem.update({ ...post });
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
            const postItem = await post_1.Post.findByPk(id);
            if (!postItem) {
                throw new not_found_exception_1.NotFoundException("Post", id);
            }
            await postItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.PostRepository = PostRepository;

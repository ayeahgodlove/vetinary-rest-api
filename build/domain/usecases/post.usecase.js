"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUseCase = void 0;
const slugify_1 = __importDefault(require("slugify"));
class PostUseCase {
    postRepository;
    /**
     *
     */
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async createPost(post) {
        const existingPost = await this.postRepository.findByTitle(post.title);
        if (existingPost) {
            throw new Error("Post already exists");
        }
        return this.postRepository.create(post);
    }
    async getAll() {
        return this.postRepository.getAll();
    }
    async getPostById(id) {
        return this.postRepository.findById(id);
    }
    async updatePost(post) {
        const obj = {
            ...post,
            slug: (0, slugify_1.default)(post.title, { lower: true, replacement: "-" }),
        };
        return this.postRepository.update(obj);
    }
    async deletePost(id) {
        return this.postRepository.delete(id);
    }
}
exports.PostUseCase = PostUseCase;

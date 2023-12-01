import { Post } from "../../data/entities/post";
import { IPostRepository } from "../../data/repositories/contracts/repository.base";
import { IPost } from "../models/post";
import slugify from "slugify";
export class PostUseCase {
  /**
   *
   */
  constructor(private readonly postRepository: IPostRepository) {}

  async createPost(post: IPost): Promise<Post> {
    const existingPost = await this.postRepository.findByTitle(post.title);

    if (existingPost) {
      throw new Error("Post already exists");
    }
    return this.postRepository.create(post);
  }

  async getAll(): Promise<Post[]> {
    return this.postRepository.getAll();
  }

  async getPostById(id: string): Promise<Post | null> {
    return this.postRepository.findById(id);
  }

  async updatePost(post: IPost): Promise<Post> {
    const obj: IPost = {
      ...post,
      slug: slugify(post.title, { lower: true, replacement: "-" }),
    };
    return this.postRepository.update(obj);
  }

  async deletePost(id: string): Promise<void> {
    return this.postRepository.delete(id);
  }
}

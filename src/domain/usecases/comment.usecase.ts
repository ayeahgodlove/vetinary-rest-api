import { Comment } from "../../data/entities/comment";
import { ICommentRepository} from "../../data/repositories/contracts/repository.base";
import { IComment } from "../models/comment";
export class CommentUseCase {
  /**
   *
   */
  constructor(private readonly commentRepository: ICommentRepository) {}

  async createComment(comment: IComment): Promise<Comment> {
    //because it's already done in the Repository
    return this.commentRepository.create(comment);
  }
  async getPostComments(postId: string): Promise<Comment[]> {
    return this.commentRepository.getPostComments(postId);
  }

  async updateComment(comment: IComment): Promise<Comment> {
    const obj: IComment = {
      ...comment,
    };
    return this.commentRepository.update(obj);
  }

  async deleteComment(id: string): Promise<void> {
    return this.commentRepository.delete(id);
  }
}

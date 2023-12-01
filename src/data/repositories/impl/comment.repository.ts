import { Comment } from "../../entities/comment";
import { IComment } from "../../../domain/models/comment";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { ICommentRepository } from "../contracts/repository.base";
import { Post } from "../../entities/post";
import { User } from "../../entities/user";

export class CommentRepository implements ICommentRepository {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Comment as parameter
   * @comment
   * returns void
   */
  async create(comment: IComment): Promise<Comment> {
    try {
      return await Comment.create<Comment>({ ...comment });
    } catch (error) {
      throw error;
    }
  }
  /*
   * get comments for a post
   */
  async getPostComments(postId: string): Promise<Comment[]> {
    try {
      const comments = await Comment.findAll({
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
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Comment as parameter
   * @comment
   * returns void
   */
  async update(comment: IComment): Promise<Comment> {
    const { id } = comment;
    try {
      const commentItem: any = await Comment.findByPk(id);

      if (!commentItem) {
        throw new NotFoundException("Comment", id.toString());
      }

      return await commentItem.update({ ...comment });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const commentItem = await Comment.findByPk(id);

      if (!commentItem) {
        throw new NotFoundException("Comment", id);
      }

      await commentItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

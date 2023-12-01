import { Request, Response } from "express";
import {
  IComment,
  ICommentResponse,
  emptyComment,
} from "../../domain/models/comment";
import { CommentUseCase } from "../../domain/usecases/comment.usecase";
import { CommentRepository } from "../../data/repositories/impl/comment.repository";
import { CommentMapper } from "../mappers/mapper";
import { CommentRequestDto } from "../dtos/comment-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { User } from "../../data/entities/user";

const commentRepository = new CommentRepository();
const commentUseCase = new CommentUseCase(commentRepository);
const commentMapper = new CommentMapper();

export class CommentsController {
  async createComment(
    req: Request,
    res: Response<ICommentResponse>
  ): Promise<void> {
    const dto = new CommentRequestDto(req.body);
    const user = req.user as User;
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const commentResponse = await commentUseCase.createComment({
          ...dto.toData(),
          userId: user.id,
          // parent_id: dto.parent_id ? dto.toData().parent_id : dto.toData().id
        });

        res.status(201).json({
          data: commentResponse.toJSON<IComment>(),
          message: "Comment created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  }

  async getPostComments(req: Request, res: Response<any>): Promise<void> {
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
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateComment(
    req: Request,
    res: Response<ICommentResponse>
  ): Promise<void> {
    const dto = new CommentRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const { id } = req.params;
        const user = req.user as User;

        const obj: IComment = {
          ...emptyComment,
          ...req.body,
          id,
          userId: user.id
        };
        const updatedComment = await commentUseCase.updateComment(
          dto.toUpdateData(obj)
        );
        const commentDto = commentMapper.toDTO(updatedComment);

        res.json({
          data: commentDto,
          message: "Comment Updated Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteComment(
    req: Request,
    res: Response<ICommentResponse>
  ): Promise<void> {
    try {
      const { id } = req.params;

      await commentUseCase.deleteComment(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      });
    }
  }
}

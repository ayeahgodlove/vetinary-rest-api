import { Request, Response } from "express";
import {
  ITag,
  ITagResponse,
  emptyTag,
} from "../../domain/models/tag";
import { TagUseCase } from "../../domain/usecases/tag.usecase";
import { TagRepository } from "../../data/repositories/impl/tag.repository";
import { TagMapper } from "../mappers/mapper";
import { TagRequestDto } from "../dtos/tag-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const tagRepository = new TagRepository();
const tagUseCase = new TagUseCase(tagRepository);
const tagMapper = new TagMapper();

export class CategoriesController {
  async createTag(
    req: Request,
    res: Response<ITagResponse>
  ): Promise<void> {
    const dto = new TagRequestDto(req.body);
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
        const tagResponse = await tagUseCase.createTag(
          dto.toData()
        );

        res.status(201).json({
          data: tagResponse.toJSON<ITag>(),
          message: "Tag created Successfully!",
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

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const categories = await tagUseCase.getAll();
      const categoriesDTO = tagMapper.toDTOs(categories);

      res.json({
        data: categoriesDTO,
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

  async getTagById(
    req: Request,
    res: Response<ITagResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const tag = await tagUseCase.getTagById(id);
      if (!tag) {
        throw new NotFoundException("Tag", id);
      }
      const tagDTO = tagMapper.toDTO(tag);
      res.json({
        data: tagDTO,
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

  async updateTag(
    req: Request,
    res: Response<ITagResponse>
  ): Promise<void> {
    const dto = new TagRequestDto(req.body);
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
        const id = req.params.id;

        const obj: ITag = {
          ...emptyTag,
          ...req.body,
          id: id,
        };
        const updatedTag = await tagUseCase.updateTag(obj);
        const tagDto = tagMapper.toDTO(updatedTag);

        res.json({
          data: tagDto,
          message: "Tag Updated Successfully!",
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

  async deleteTag(
    req: Request,
    res: Response<ITagResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await tagUseCase.deleteTag(id);

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

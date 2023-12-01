import { Request, Response } from "express";
import { IBanner, IBannerResponse, emptyBanner } from "../../domain/models/banner";
import { BannerUseCase } from "../../domain/usecases/banner.usecase";
import { BannerRepository } from "../../data/repositories/impl/banner.repository";
import { BannerMapper } from "../mappers/mapper";
import { BannerRequestDto } from "../dtos/banner-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { User } from "../../data/entities/user";

const bannerRepository = new BannerRepository();
const bannerUseCase = new BannerUseCase(bannerRepository);
const bannerMapper = new BannerMapper();

export class BannersController {
  async createBanner(
    req: Request,
    res: Response<IBannerResponse>
  ): Promise<void> {
    const dto = new BannerRequestDto(req.body);
    const validationErrors = await validate(dto);

    const user = req.user as User;
    const { filename } = req.file as Express.Multer.File;

    if (filename === undefined) {
      throw new Error("Photo not found!");
    }

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const bannerResponse = await bannerUseCase.createBanner({
          ...dto.toData(),
          userId: user.id,
          image: filename.toString(),
        });

        res.status(201).json({
          data: bannerResponse.toJSON<IBanner>(),
          message: "Banner created Successfully!",
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
      const banners = await bannerUseCase.getAll();
      const bannersDTO = bannerMapper.toDTOs(banners);

      res.json({
        data: bannersDTO,
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

  async getBannerById(
    req: Request,
    res: Response<IBannerResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const banner = await bannerUseCase.getBannerById(id);
      if (!banner) {
        throw new NotFoundException("Banner", id);
      }
      const bannerDTO = bannerMapper.toDTO(banner);
      res.json({
        data: bannerDTO,
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

  async updateBanner(
    req: Request,
    res: Response<IBannerResponse>
  ): Promise<void> {
    const dto = new BannerRequestDto(req.body);
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

        const obj: IBanner = {
          ...emptyBanner,
          ...req.body,
          id: id,
        };
        const updatedBanner = await bannerUseCase.updateBanner(obj);
        const bannerDto = bannerMapper.toDTO(updatedBanner);

        res.json({
          data: bannerDto,
          message: "Banner Updated Successfully!",
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

  async deleteBanner(
    req: Request,
    res: Response<IBannerResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await bannerUseCase.deleteBanner(id);

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

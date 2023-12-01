import { Banner } from "../../data/entities/banner";
import { IBannerRepository } from "../../data/repositories/contracts/repository.base";
import { IBanner } from "../models/banner";

export class BannerUseCase {
  /**
   *
   */
  constructor(private readonly bannerRepository: IBannerRepository) {}

  async createBanner(banner: IBanner): Promise<Banner> {
    const existingBanner = await this.bannerRepository.findByTitle(
      banner.title
    );

    if (existingBanner) {
      throw new Error("Banner already exists");
    }

    // const _banner = new Banner({banner});
    //because it's already done in the Repository
    return this.bannerRepository.create(banner);
  }

  async getAll(): Promise<Banner[]> {
    return this.bannerRepository.getAll();
  }

  async getBannerById(id: string): Promise<Banner | null> {
    return this.bannerRepository.findById(id);
  }

  async updateBanner(banner: IBanner): Promise<Banner> {
    return this.bannerRepository.update(banner);
  }

  async deleteBanner(id: string): Promise<void> {
    return this.bannerRepository.delete(id);
  }
}

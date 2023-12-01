"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerUseCase = void 0;
class BannerUseCase {
    bannerRepository;
    /**
     *
     */
    constructor(bannerRepository) {
        this.bannerRepository = bannerRepository;
    }
    async createBanner(banner) {
        const existingBanner = await this.bannerRepository.findByTitle(banner.title);
        if (existingBanner) {
            throw new Error("Banner already exists");
        }
        // const _banner = new Banner({banner});
        //because it's already done in the Repository
        return this.bannerRepository.create(banner);
    }
    async getAll() {
        return this.bannerRepository.getAll();
    }
    async getBannerById(id) {
        return this.bannerRepository.findById(id);
    }
    async updateBanner(banner) {
        return this.bannerRepository.update(banner);
    }
    async deleteBanner(id) {
        return this.bannerRepository.delete(id);
    }
}
exports.BannerUseCase = BannerUseCase;

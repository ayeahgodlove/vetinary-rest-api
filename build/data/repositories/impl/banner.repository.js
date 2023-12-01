"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRepository = void 0;
const banner_1 = require("../../entities/banner");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class BannerRepository {
    constructor() { }
    findByName(name) {
        throw new Error("Method not implemented.");
    }
    /**
     * Receives a Banner as parameter
     * @banner
     * returns void
     */
    async create(banner) {
        try {
            return await banner_1.Banner.create({ ...banner });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Banner
     */
    async findById(id) {
        try {
            const bannerItem = await banner_1.Banner.findByPk(id);
            if (!bannerItem) {
                throw new not_found_exception_1.NotFoundException("Banner", id);
            }
            return bannerItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @title
     * returns Banner
     */
    async findByTitle(title) {
        try {
            const bannerItem = await banner_1.Banner.findOne({ where: { title } });
            return bannerItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Banner
     */
    async getAll() {
        try {
            const categories = await banner_1.Banner.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Banner as parameter
     * @banner
     * returns void
     */
    async update(banner) {
        const { id } = banner;
        try {
            const bannerItem = await banner_1.Banner.findByPk(id);
            console.log(banner);
            if (!bannerItem) {
                throw new not_found_exception_1.NotFoundException("Banner", id.toString());
            }
            return await bannerItem.update({ ...banner });
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
            const bannerItem = await banner_1.Banner.findByPk(id);
            if (!bannerItem) {
                throw new not_found_exception_1.NotFoundException("Banner", id);
            }
            await bannerItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BannerRepository = BannerRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRepository = void 0;
const store_1 = require("../../entities/store");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class StoreRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Store as parameter
     * @store
     * returns void
     */
    async create(store) {
        try {
            return await store_1.Store.create({ ...store });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Store
     */
    async findById(id) {
        try {
            const storeItem = await store_1.Store.findByPk(id);
            if (!storeItem) {
                throw new not_found_exception_1.NotFoundException("Store", id);
            }
            return storeItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Store
     */
    async findByName(name) {
        try {
            const storeItem = await store_1.Store.findOne({ where: { name } });
            return storeItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Store
     */
    async getAll() {
        try {
            const stores = await store_1.Store.findAll();
            return stores;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Store as parameter
     * @store
     * returns void
     */
    async update(store) {
        const { id } = store;
        try {
            const storeItem = await store_1.Store.findByPk(id);
            console.log(store);
            if (!storeItem) {
                throw new not_found_exception_1.NotFoundException("Store", id.toString());
            }
            return await storeItem.update({ ...store });
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
            const storeItem = await store_1.Store.findByPk(id);
            if (!storeItem) {
                throw new not_found_exception_1.NotFoundException("Store", id);
            }
            await storeItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.StoreRepository = StoreRepository;

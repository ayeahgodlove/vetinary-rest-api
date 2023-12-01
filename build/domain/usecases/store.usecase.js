"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreUseCase = void 0;
class StoreUseCase {
    storeRepository;
    /**
     *
     */
    constructor(storeRepository) {
        this.storeRepository = storeRepository;
    }
    async createStore(store) {
        const existingStore = await this.storeRepository.findByName(store.name);
        if (existingStore) {
            throw new Error("Store already exists");
        }
        // const _store = new Store({store});
        //because it's already done in the Repository
        return this.storeRepository.create(store);
    }
    async getAll() {
        return this.storeRepository.getAll();
    }
    async getStoreById(id) {
        return this.storeRepository.findById(id);
    }
    async updateStore(store) {
        const { id, name, location, imageBannerUrl, userId } = store;
        const obj = {
            id,
            name,
            imageBannerUrl,
            location,
            userId,
        };
        return this.storeRepository.update(obj);
    }
    async deleteStore(id) {
        return this.storeRepository.delete(id);
    }
}
exports.StoreUseCase = StoreUseCase;

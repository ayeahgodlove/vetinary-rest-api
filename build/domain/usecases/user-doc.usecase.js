"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDocUseCase = void 0;
class UserDocUseCase {
    userDocRepository;
    /**
     *
     */
    constructor(userDocRepository) {
        this.userDocRepository = userDocRepository;
    }
    async createUserDoc(userDoc) {
        const existingUserDoc = await this.userDocRepository.findByName(userDoc.userId);
        if (existingUserDoc) {
            throw new Error("UserDoc already exists");
        }
        // const _userDoc = new UserDoc({userDoc});
        //because it's already done in the Repository
        return this.userDocRepository.create(userDoc);
    }
    async getAll() {
        return this.userDocRepository.getAll();
    }
    async getUserDocById(id) {
        return this.userDocRepository.findById(id);
    }
    async updateUserDoc(userDoc) {
        const obj = {
            ...userDoc,
        };
        return this.userDocRepository.update(obj);
    }
    async deleteUserDoc(id) {
        return this.userDocRepository.delete(id);
    }
}
exports.UserDocUseCase = UserDocUseCase;

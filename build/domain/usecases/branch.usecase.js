"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchUseCase = void 0;
class BranchUseCase {
    branchRepository;
    /**
     *
     */
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async createBranch(branch) {
        const existingBranch = await this.branchRepository.findByName(branch.name);
        if (existingBranch) {
            throw new Error("Branch already exists");
        }
        // const _branch = new Branch({branch});
        //because it's already done in the Repository
        return this.branchRepository.create(branch);
    }
    async getAll() {
        return this.branchRepository.getAll();
    }
    async getBranchById(id) {
        return this.branchRepository.findById(id);
    }
    async updateBranch(branch) {
        return this.branchRepository.update(branch);
    }
    async deleteBranch(id) {
        return this.branchRepository.delete(id);
    }
}
exports.BranchUseCase = BranchUseCase;

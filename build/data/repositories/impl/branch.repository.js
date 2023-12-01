"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchRepository = void 0;
const branch_1 = require("../../entities/branch");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class BranchRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Branch as parameter
     * @branch
     * returns void
     */
    async create(branch) {
        try {
            return await branch_1.Branch.create({ ...branch });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Branch
     */
    async findById(id) {
        try {
            const branchItem = await branch_1.Branch.findByPk(id);
            if (!branchItem) {
                throw new not_found_exception_1.NotFoundException("Branch", id);
            }
            return branchItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Branch
     */
    async findByName(name) {
        try {
            const branchItem = await branch_1.Branch.findOne({ where: { name } });
            return branchItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Branch
     */
    async getAll() {
        try {
            const categories = await branch_1.Branch.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Branch as parameter
     * @branch
     * returns void
     */
    async update(branch) {
        const { id } = branch;
        try {
            const branchItem = await branch_1.Branch.findByPk(id);
            console.log(branch);
            if (!branchItem) {
                throw new not_found_exception_1.NotFoundException("Branch", id.toString());
            }
            return await branchItem.update({ ...branch });
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
            const branchItem = await branch_1.Branch.findByPk(id);
            if (!branchItem) {
                throw new not_found_exception_1.NotFoundException("Branch", id);
            }
            await branchItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BranchRepository = BranchRepository;

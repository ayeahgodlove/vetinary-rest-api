"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUseCase = void 0;
class RoleUseCase {
    roleRepository;
    /**
     *
     */
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async createRole(role) {
        const existingRole = await this.roleRepository.findByName(role.name);
        if (existingRole) {
            throw new Error("Role already exists");
        }
        // const _role = new Role({role});
        //because it's already done in the Repository
        return this.roleRepository.create(role);
    }
    async getAll() {
        return this.roleRepository.getAll();
    }
    async getRoleById(id) {
        return this.roleRepository.findById(id);
    }
    async updateRole(role) {
        return this.roleRepository.update(role);
    }
    async deleteRole(id) {
        return this.roleRepository.delete(id);
    }
}
exports.RoleUseCase = RoleUseCase;

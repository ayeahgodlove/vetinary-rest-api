"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const role_1 = require("../../entities/role");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class RoleRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Role as parameter
     * @role
     * returns void
     */
    async create(role) {
        try {
            return await role_1.Role.create({ ...role });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Role
     */
    async findById(id) {
        try {
            const roleItem = await role_1.Role.findByPk(id);
            if (!roleItem) {
                throw new not_found_exception_1.NotFoundException("Role", id);
            }
            return roleItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Role
     */
    async findByName(name) {
        try {
            const roleItem = await role_1.Role.findOne({ where: { name } });
            return roleItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Role
     */
    async getAll() {
        try {
            const roles = await role_1.Role.findAll();
            return roles;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Role as parameter
     * @role
     * returns void
     */
    async update(role) {
        const { id } = role;
        try {
            const roleItem = await role_1.Role.findByPk(id);
            console.log(role);
            if (!roleItem) {
                throw new not_found_exception_1.NotFoundException("Role", id.toString());
            }
            return await roleItem.update({ ...role });
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
            const roleItem = await role_1.Role.findByPk(id);
            if (!roleItem) {
                throw new not_found_exception_1.NotFoundException("Role", id);
            }
            await roleItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.RoleRepository = RoleRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRepository = void 0;
const not_found_exception_1 = require("../../../../shared/exceptions/not-found.exception");
const enrollment_1 = require("../../../entities/lms/enrollment");
class EnrollmentRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Enrollment as parameter
     * @enrollment
     * returns void
     */
    async create(enrollment) {
        try {
            return await enrollment_1.Enrollment.create({ ...enrollment });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Enrollment
     */
    async findById(id) {
        try {
            const enrollmentItem = await enrollment_1.Enrollment.findByPk(id);
            if (!enrollmentItem) {
                throw new not_found_exception_1.NotFoundException("Enrollment", id);
            }
            return enrollmentItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Enrollment
     */
    async findByName(queryId) {
        try {
            const enrollmentItem = await enrollment_1.Enrollment.findOne({ where: { userId: queryId } });
            return enrollmentItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Enrollment
     */
    async getAll() {
        try {
            const categories = await enrollment_1.Enrollment.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Enrollment as parameter
     * @enrollment
     * returns void
     */
    async update(enrollment) {
        const { id } = enrollment;
        try {
            const enrollmentItem = await enrollment_1.Enrollment.findByPk(id);
            console.log(enrollment);
            if (!enrollmentItem) {
                throw new not_found_exception_1.NotFoundException("Enrollment", id.toString());
            }
            return await enrollmentItem.update({ ...enrollment });
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
            const enrollmentItem = await enrollment_1.Enrollment.findByPk(id);
            if (!enrollmentItem) {
                throw new not_found_exception_1.NotFoundException("Enrollment", id);
            }
            await enrollmentItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.EnrollmentRepository = EnrollmentRepository;

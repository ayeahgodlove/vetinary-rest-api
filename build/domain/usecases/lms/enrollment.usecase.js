"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentUseCase = void 0;
class EnrollmentUseCase {
    enrollmentRepository;
    /**
     *
     */
    constructor(enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }
    async createEnrollment(enrollment) {
        const existingEnrollment = await this.enrollmentRepository.findByName(enrollment.userId);
        if (existingEnrollment) {
            throw new Error("User already enrolled for this course");
        }
        // const _enrollment = new Enrollment({enrollment});
        //because it's already done in the Repository
        return this.enrollmentRepository.create(enrollment);
    }
    async getAll() {
        return this.enrollmentRepository.getAll();
    }
    async getEnrollmentById(id) {
        return this.enrollmentRepository.findById(id);
    }
    async updateEnrollment(enrollment) {
        return this.enrollmentRepository.update(enrollment);
    }
    async deleteEnrollment(id) {
        return this.enrollmentRepository.delete(id);
    }
}
exports.EnrollmentUseCase = EnrollmentUseCase;

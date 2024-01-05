"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationUseCase = void 0;
class ConsultationUseCase {
    consultationRepository;
    /**
     *
     */
    constructor(consultationRepository) {
        this.consultationRepository = consultationRepository;
    }
    async createConsultation(consultation) {
        const existingConsultation = await this.consultationRepository.findByName(consultation.vetDoctorId);
        if (existingConsultation) {
            throw new Error("Consultation already exists");
        }
        // const _consultation = new Consultation({consultation});
        //because it's already done in the Repository
        return this.consultationRepository.create(consultation);
    }
    async getAll() {
        return this.consultationRepository.getAll();
    }
    async getConsultationById(id) {
        return this.consultationRepository.findById(id);
    }
    async updateConsultation(consultation) {
        return this.consultationRepository.update(consultation);
    }
    async deleteConsultation(id) {
        return this.consultationRepository.delete(id);
    }
}
exports.ConsultationUseCase = ConsultationUseCase;

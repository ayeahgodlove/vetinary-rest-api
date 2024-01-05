"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationRepository = void 0;
const not_found_exception_1 = require("../../../../shared/exceptions/not-found.exception");
const consultation_1 = require("../../../entities/health/consultation");
class ConsultationRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Consultation as parameter
     * @consultation
     * returns void
     */
    async create(consultation) {
        try {
            return await consultation_1.Consultation.create({ ...consultation });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Consultation
     */
    async findById(id) {
        try {
            const consultationItem = await consultation_1.Consultation.findByPk(id);
            if (!consultationItem) {
                throw new not_found_exception_1.NotFoundException("Consultation", id);
            }
            return consultationItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Consultation
     */
    async findByName(id) {
        try {
            const consultationItem = await consultation_1.Consultation.findOne({ where: { vetDoctorId: id } });
            return consultationItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Consultation
     */
    async getAll() {
        try {
            const consultations = await consultation_1.Consultation.findAll();
            return consultations;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Consultation as parameter
     * @consultation
     * returns void
     */
    async update(consultation) {
        const { id } = consultation;
        try {
            const consultationItem = await consultation_1.Consultation.findByPk(id);
            console.log(consultation);
            if (!consultationItem) {
                throw new not_found_exception_1.NotFoundException("Consultation", id.toString());
            }
            return await consultationItem.update({ ...consultation });
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
            const consultationItem = await consultation_1.Consultation.findByPk(id);
            if (!consultationItem) {
                throw new not_found_exception_1.NotFoundException("Consultation", id);
            }
            await consultationItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ConsultationRepository = ConsultationRepository;

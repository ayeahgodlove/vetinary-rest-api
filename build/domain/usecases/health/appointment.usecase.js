"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentUseCase = void 0;
class AppointmentUseCase {
    appointmentRepository;
    /**
     *
     */
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async createAppointment(appointment) {
        const existingAppointment = await this.appointmentRepository.findByName(appointment.vetDoctorId);
        if (existingAppointment) {
            throw new Error("Appointment already exists");
        }
        // const _appointment = new Appointment({appointment});
        //because it's already done in the Repository
        return this.appointmentRepository.create(appointment);
    }
    async getAll() {
        return this.appointmentRepository.getAll();
    }
    async getAppointmentById(id) {
        return this.appointmentRepository.findById(id);
    }
    async updateAppointment(appointment) {
        return this.appointmentRepository.update(appointment);
    }
    async deleteAppointment(id) {
        return this.appointmentRepository.delete(id);
    }
}
exports.AppointmentUseCase = AppointmentUseCase;

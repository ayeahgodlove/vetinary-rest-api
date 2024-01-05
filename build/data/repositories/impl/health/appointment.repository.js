"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const not_found_exception_1 = require("../../../../shared/exceptions/not-found.exception");
const appointment_1 = require("../../../entities/health/appointment");
class AppointmentRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Appointment as parameter
     * @appointment
     * returns void
     */
    async create(appointment) {
        try {
            return await appointment_1.Appointment.create({ ...appointment });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Appointment
     */
    async findById(id) {
        try {
            const appointmentItem = await appointment_1.Appointment.findByPk(id);
            if (!appointmentItem) {
                throw new not_found_exception_1.NotFoundException("Appointment", id);
            }
            return appointmentItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Appointment
     */
    async findByName(id) {
        try {
            const appointmentItem = await appointment_1.Appointment.findOne({ where: { vetDoctorId: id } });
            return appointmentItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Appointment
     */
    async getAll() {
        try {
            const appointments = await appointment_1.Appointment.findAll();
            return appointments;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Appointment as parameter
     * @appointment
     * returns void
     */
    async update(appointment) {
        const { id } = appointment;
        try {
            const appointmentItem = await appointment_1.Appointment.findByPk(id);
            console.log(appointment);
            if (!appointmentItem) {
                throw new not_found_exception_1.NotFoundException("Appointment", id.toString());
            }
            return await appointmentItem.update({ ...appointment });
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
            const appointmentItem = await appointment_1.Appointment.findByPk(id);
            if (!appointmentItem) {
                throw new not_found_exception_1.NotFoundException("Appointment", id);
            }
            await appointmentItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AppointmentRepository = AppointmentRepository;

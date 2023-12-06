import { IRepository } from "../../../data/repositories/contracts/repository.base";
import { IAppointment } from "../../models/health/appointment";
import { Appointment } from "../../../data/entities/health/appointment";
export class AppointmentUseCase {
  /**
   *
   */
  constructor(
    private readonly appointmentRepository: IRepository<
      IAppointment,
      Appointment
    >
  ) {}

  async createAppointment(appointment: IAppointment): Promise<Appointment> {
    const existingAppointment = await this.appointmentRepository.findByName(
      appointment.vetDoctorId
    );

    if (existingAppointment) {
      throw new Error("Appointment already exists");
    }

    // const _appointment = new Appointment({appointment});
    //because it's already done in the Repository
    return this.appointmentRepository.create(appointment);
  }

  async getAll(): Promise<Appointment[]> {
    return this.appointmentRepository.getAll();
  }

  async getAppointmentById(id: string): Promise<Appointment | null> {
    return this.appointmentRepository.findById(id);
  }

  async updateAppointment(appointment: IAppointment): Promise<Appointment> {
    return this.appointmentRepository.update(appointment);
  }

  async deleteAppointment(id: string): Promise<void> {
    return this.appointmentRepository.delete(id);
  }
}

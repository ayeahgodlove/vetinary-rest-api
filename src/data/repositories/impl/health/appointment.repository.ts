import { IAppointment } from "../../../../domain/models/health/appointment";
import { NotFoundException } from "../../../../shared/exceptions/not-found.exception";
import { Appointment } from "../../../entities/health/appointment";
import { IRepository } from "../../contracts/repository.base";


export class AppointmentRepository implements IRepository<IAppointment, Appointment> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Appointment as parameter
   * @appointment
   * returns void
   */
  async create(appointment: IAppointment): Promise<Appointment> {
    try {
      return await Appointment.create<Appointment>({ ...appointment });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Appointment
   */
  async findById(id: string): Promise<Appointment | null> {
    try {
      const appointmentItem = await Appointment.findByPk(id);

      if (!appointmentItem) {
        throw new NotFoundException("Appointment", id);
      }
      return appointmentItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Appointment
   */
  async findByName(id: string): Promise<Appointment | null> {
    try {
      const appointmentItem = await Appointment.findOne({ where: { vetDoctorId: id } });
      return appointmentItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Appointment
   */
  async getAll(): Promise<Appointment[]> {
    try {
      const appointments = await Appointment.findAll();
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Appointment as parameter
   * @appointment
   * returns void
   */
  async update(appointment: IAppointment): Promise<Appointment> {
    const { id } = appointment;
    try {
      const appointmentItem: any = await Appointment.findByPk(id);

      console.log(appointment);
      if (!appointmentItem) {
        throw new NotFoundException("Appointment", id.toString());
      }

      return await appointmentItem.update({ ...appointment });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const appointmentItem = await Appointment.findByPk(id);

      if (!appointmentItem) {
        throw new NotFoundException("Appointment", id);
      }

      await appointmentItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

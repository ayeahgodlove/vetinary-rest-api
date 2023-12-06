import { IConsultation } from "../../../../domain/models/health/consultation";
import { NotFoundException } from "../../../../shared/exceptions/not-found.exception";
import { Consultation } from "../../../entities/health/consultation";
import { IRepository } from "../../contracts/repository.base";


export class ConsultationRepository implements IRepository<IConsultation, Consultation> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Consultation as parameter
   * @consultation
   * returns void
   */
  async create(consultation: IConsultation): Promise<Consultation> {
    try {
      return await Consultation.create<Consultation>({ ...consultation });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Consultation
   */
  async findById(id: string): Promise<Consultation | null> {
    try {
      const consultationItem = await Consultation.findByPk(id);

      if (!consultationItem) {
        throw new NotFoundException("Consultation", id);
      }
      return consultationItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Consultation
   */
  async findByName(id: string): Promise<Consultation | null> {
    try {
      const consultationItem = await Consultation.findOne({ where: { vetDoctorId: id } });
      return consultationItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Consultation
   */
  async getAll(): Promise<Consultation[]> {
    try {
      const consultations = await Consultation.findAll();
      return consultations;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Consultation as parameter
   * @consultation
   * returns void
   */
  async update(consultation: IConsultation): Promise<Consultation> {
    const { id } = consultation;
    try {
      const consultationItem: any = await Consultation.findByPk(id);

      console.log(consultation);
      if (!consultationItem) {
        throw new NotFoundException("Consultation", id.toString());
      }

      return await consultationItem.update({ ...consultation });
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
      const consultationItem = await Consultation.findByPk(id);

      if (!consultationItem) {
        throw new NotFoundException("Consultation", id);
      }

      await consultationItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

import { IRepository } from "../../../data/repositories/contracts/repository.base";
import { IConsultation } from "../../models/health/consultation";
import { Consultation } from "../../../data/entities/health/consultation";

export class ConsultationUseCase {
  /**
   *
   */
  constructor(
    private readonly consultationRepository: IRepository<
      IConsultation,
      Consultation
    >
  ) {}

  async createConsultation(consultation: IConsultation): Promise<Consultation> {
    const existingConsultation = await this.consultationRepository.findByName(
      consultation.vetDoctorId
    );

    if (existingConsultation) {
      throw new Error("Consultation already exists");
    }

    // const _consultation = new Consultation({consultation});
    //because it's already done in the Repository
    return this.consultationRepository.create(consultation);
  }

  async getAll(): Promise<Consultation[]> {
    return this.consultationRepository.getAll();
  }

  async getConsultationById(id: string): Promise<Consultation | null> {
    return this.consultationRepository.findById(id);
  }

  async updateConsultation(consultation: IConsultation): Promise<Consultation> {
    return this.consultationRepository.update(consultation);
  }

  async deleteConsultation(id: string): Promise<void> {
    return this.consultationRepository.delete(id);
  }
}

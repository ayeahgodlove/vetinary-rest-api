import { Payment } from "../../data/entities/payment";
import { IPaymentRepository } from "../../data/repositories/contracts/repository.base";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { IPayment } from "../models/payment";

export class PaymentUseCase {
  /**
   *
   */
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async createPayment(payment: IPayment): Promise<Payment> {
    const existingPayment = await this.paymentRepository.findByOrderId(
      payment.orderNo
    );

    if (existingPayment) {
      throw new NotFoundException("Payment", payment.orderNo);
    }

    // const _payment = new Payment({payment});
    //because it's already done in the Repository
    return this.paymentRepository.create(payment);
  }

  async getAll(): Promise<Payment[]> {
    return this.paymentRepository.getAll();
  }

  async getPaymentById(id: string): Promise<Payment | null> {
    return this.paymentRepository.findById(id);
  }

  async getPaymentByOrderNo(payment: IPayment): Promise<Payment | null> {
    const _payment = await this.paymentRepository.findByOrderId(
      payment.orderNo
    );

    if (!_payment) {
      return null;
    }

    return _payment;
  }

  async updatePayment(payment: IPayment): Promise<Payment> {
    return this.paymentRepository.update(payment);
  }

  async deletePayment(id: string): Promise<void> {
    return this.paymentRepository.delete(id);
  }
}

// src/presentation/dtos/PaymentRequestDto.ts

import {  IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { IPayment, emptyPayment } from "../../domain/models/payment";
import { v4 } from "uuid";

// status: string;
export class PaymentRequestDto {
  @IsNotEmpty()
  @IsString()
  orderNo: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  constructor(data: IPayment) {
    this.orderNo = data.orderNo;
    this.status = data.status;
  }

  toData(): IPayment {
    return {
      ...emptyPayment,
      id: v4(),
      orderNo: this.orderNo,
      status: this.status,
    };
  }

  toUpdateData(data: IPayment): IPayment {
    return {
      id: data.id,
      amount: data.amount,
      userId: data.userId,
      orderNo: data.orderNo,
      status: data.status,
      address: data.address,
      cellPhone: data.cellPhone,
      email: data.email,
      username: data.username
    }
  }
}

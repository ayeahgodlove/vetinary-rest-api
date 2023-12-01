// src/presentation/dtos/OrderRequestDto.ts

import { IsNotEmpty, IsString } from "class-validator";
import { IOrder, emptyOrder } from "../../domain/models/order";
import { v4 } from "uuid";

export class OrderRequestDto {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  orderNo: string;

  constructor(data: IOrder) {
    this.status = data.status;
    this.orderNo = data.orderNo;
    // this.totalAmount = data.totalAmount;
    // this.totalQtty = data.totalQtty
  }

  toData(totalAmount: number, totalQtty: number): IOrder {
    return {
      ...emptyOrder,
      id: v4(),
      orderNo: this.orderNo,
      status: this.status,
      totalAmount: totalAmount,
      totalQtty: totalQtty
    };
  }

  toUpdateData(data: IOrder): IOrder {
    return {
      id: data.id,
      orderNo: data.orderNo,
      status: data.status,
      totalAmount: data.totalAmount,
      userId: data.userId,
      totalQtty: data.totalQtty,
      products: data.products,
      address: data.address,
      cellPhone: data.cellPhone,
      email: data.email,
      username: data.username
    };
  }
}

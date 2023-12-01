// src/presentation/dtos/productImage-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import {
  IProductImage,
  emptyProductImage,
} from "../../domain/models/product-image";
import { nanoid } from "nanoid";

export class ProductImageRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 255)
  productName: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  constructor(data: IProductImage) {
    this.productName = data.productName;
    this.productId = data.productId;
  }

  toData(): IProductImage {
    return {
      ...emptyProductImage,
      id: nanoid(10),
      productName: this.productName,
      productId: this.productId,
    };
  }

  toArrayData(): IProductImage[] {
    return [this.toData()];
  }

  toUpdateData(data: IProductImage): IProductImage {
    return {
      id: data.id,
      productId: data.productId,
      productName: data.productName,
      imageUrl: data.imageUrl,
    };
  }
}

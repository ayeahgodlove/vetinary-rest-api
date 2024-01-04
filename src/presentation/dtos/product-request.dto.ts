
import { IsArray, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { IProduct, emptyProduct } from "../../domain/models/product";
import { nanoid } from "nanoid";

export class ProductRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString() 
  shortDescription: string;

  @IsNotEmpty()
  // @IsNumber()
  amount: number;

  @IsNotEmpty()
  // @IsNumber()
  qtty: number;

  @IsNotEmpty()
  @IsString()
  categoryId: string

  @IsNotEmpty()
  @IsString()
  storeId: string

  // @IsNotEmpty()
  // @IsArray()
  // productImages: string[];


  constructor(data: IProduct) {
    this.name = data.name;
    this.description = data.description;
    this.shortDescription = data.shortDescription;
    this.amount = data.amount;
    this.qtty = data.qtty;
    this.categoryId = data.categoryId;
    this.storeId = data.storeId;
  }

  toData(): IProduct {
    return {
      ...emptyProduct,
      id: nanoid(10),
      name: this.name,
      description: this.description,
      shortDescription: this.shortDescription,
      amount: Number(this.amount),
      qtty: Number(this.qtty),
      categoryId: this.categoryId,
      storeId: this.storeId,
    };
  }

  toUpdateData(data: IProduct): IProduct {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription,
      amount: Number(data.amount),
      qtty: Number(data.qtty),
      categoryId: data.categoryId,
      storeId: data.storeId,
      productImages: data.productImages,
      reviews: data.reviews,
      tags: data.tags,
      orders: data.orders,
    };
  }
}

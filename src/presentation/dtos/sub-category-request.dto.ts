// src/presentation/dtos/category-request.dto.ts

import {  IsNotEmpty, IsString, Length } from "class-validator";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { ISubCategory, emptySubCategory } from "../../domain/models/sub-category";

export class SubCategoryRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(data: ISubCategory) {
    this.name = data.name;
    this.description = data.description;
  }

  toData(): ISubCategory {
    return {
      ...emptySubCategory,
      id: nanoid(10),
      slug:  slugify(this.name, {lower: true, replacement: "-"}),
      name: this.name,
      description: this.description,
    };
  }

  toUpdateData(data: ISubCategory): ISubCategory {
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
    }
  }
}

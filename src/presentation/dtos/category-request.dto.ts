// src/presentation/dtos/category-request.dto.ts

import {  IsNotEmpty, IsString, Length } from "class-validator";
import { ICategory, emptyCategory } from "../../domain/models/category";
import slugify from "slugify";
import { nanoid } from "nanoid";
export class CategoryRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(data: ICategory) {
    this.name = data.name;
    this.description = data.description;
  }

  toData(): ICategory {
    return {
      ...emptyCategory,
      id: nanoid(10),
      slug:  slugify(this.name, {lower: true, replacement: "-"}),
      name: this.name,
      description: this.description,
    };
  }

  toUpdateData(data: ICategory): ICategory {
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
    }
  }
}

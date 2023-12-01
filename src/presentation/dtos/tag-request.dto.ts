// src/presentation/dtos/tag-request.dto.ts

import {  IsNotEmpty, IsString, Length } from "class-validator";
import { ITag, emptyTag } from "../../domain/models/tag";
import { nanoid } from "nanoid";

export class TagRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  name: string;

  constructor(data: ITag) {
    this.name = data.name;
  }

  toData(): ITag {
    return {
      ...emptyTag,
      id: nanoid(10),
      name: this.name,
    };
  }

  toUpdateData(data: ITag): ITag {
    return {
      id: data.id,
      name: data.name,
    }
  }
}

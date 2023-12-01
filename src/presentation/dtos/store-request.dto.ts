// src/presentation/dtos/store-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import { IStore, emptyStore } from "../../domain/models/store";
import { nanoid } from "nanoid";

export class StoreRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  location: string;


  constructor(data: IStore) {
    this.name = data.name;
    this.location = data.location;
  }

  toData(): IStore {
    return {
      ...emptyStore,
      id: nanoid(10),
      name: this.name,
      location: this.location,
    };
  }

  toUpdateData(data: IStore): IStore {
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      imageBannerUrl: data.imageBannerUrl,
      userId: data.userId
    };
  }
}

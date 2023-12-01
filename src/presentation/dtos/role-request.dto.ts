// src/presentation/dtos/role-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import { IRole, emptyRole } from "../../domain/models/role";
import { nanoid } from "nanoid";

export class RoleRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  name: string;

  constructor(data: IRole) {
    this.name = data.name;
  }

  toData(): IRole {
    return {
      ...emptyRole,
      id: nanoid(10),
      name: this.name,
    };
  }

  toUpdateData(data: IRole): IRole {
    return {
      id: data.id,
      name: data.name,
    };
  }
}

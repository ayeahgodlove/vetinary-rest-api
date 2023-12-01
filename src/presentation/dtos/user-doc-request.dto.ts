// src/presentation/dtos/userDoc-request.dto.ts

import { IUserDoc, emptyUserDoc } from "../../domain/models/user-doc";
import { nanoid } from "nanoid";
export class UserDocRequestDto {
  // @IsNotEmpty()
  // @IsString()
  userId: string;

  // @IsNotEmpty()
  // @IsString()
  scannedIdCard: string;

  // @IsNotEmpty()
  // @IsString()
  scannedLiscence: string;

  constructor(data: IUserDoc) {
    this.userId = data.userId;
    this.scannedIdCard = data.scannedIdCard;
    this.scannedLiscence = data.scannedLiscence;
  }

  toData(): IUserDoc {
    return {
      ...emptyUserDoc,
      id: nanoid(10),
      userId: this.userId,
      scannedIdCard: this.scannedIdCard,
      scannedLiscence: this.scannedLiscence,
    };
  }

  toUpdateData(data: IUserDoc): IUserDoc {
    return {
      id: data.id,
      userId: data.userId,
      scannedIdCard: data.scannedIdCard,
      scannedLiscence: data.scannedLiscence,
    };
  }
}
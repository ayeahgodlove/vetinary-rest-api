import {
  Table,
  Model,
  Column,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user";
import { Store } from "./store";
import { IUserStore } from "../../domain/models/user-store";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "user-store",
})

export class UserStore extends Model<IUserStore> {
  @ForeignKey(() => User)
  @Column
  userId!: string;

  @ForeignKey(() => Store)
  @Column
  storeId!: string;
}

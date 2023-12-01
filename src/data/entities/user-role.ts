import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import { IUserRole } from "../../domain/models/user-role";
import { User } from "./user";
import { Role } from "./role";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "user-role",
})
export class UserRole extends Model<IUserRole> {
  @ForeignKey(() => User)
  @Column
  userId!: string;

  @ForeignKey(() => Role)
  @Column
  roleId!: string;
}

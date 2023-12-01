import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { IRole } from "../../domain/models/role";
import { User } from "./user";
import { UserRole } from "./user-role";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "role",
})
export class Role extends Model<IRole> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  name!: string;

  // relationships
  // Define the many-to-many association with User
  @BelongsToMany(() => User, () => UserRole)
  users!: User[];
}

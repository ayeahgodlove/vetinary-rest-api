import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  BelongsToMany,
} from "sequelize-typescript";
import { IUser } from "../../domain/models/user";
import { Role } from "./role";
import { UserDoc } from "./user-doc";
import { UserRole } from "./user-role";
import { Store } from "./store";
import { UserStore } from "./user-store";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "user",
})
export class User extends Model<IUser> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  authStrategy!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  firstname!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  lastname!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  avatar!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(13),
  })
  phoneNumber!: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: true,
  })
  city!: string; 

  @Column({
    type: DataType.STRING(30),
    allowNull: true,
  })
  country!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  address!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
  })
  password!: string;

  // verification paramters
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified!: boolean;

  @HasOne(() => UserDoc)
  userDoc!: UserDoc;

  // Define the many-to-many association with Role
  @BelongsToMany(() => Role, () => UserRole)
  roles!: Role[];

  @BelongsToMany(() => Store, () => UserStore)
  stores!: Store[];

}

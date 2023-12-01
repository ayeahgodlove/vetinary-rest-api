import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { IStore } from "../../domain/models/store";
import { Product } from "./product";
import { Branch } from "./branch";
import { User } from "./user";
import { UserStore } from "./user-store";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "store",
})
export class Store extends Model<IStore> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @ForeignKey(() => User) // foreign key
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  userId!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: false,
  })
  location!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  imageBannerUrl!: string;

  // relationships
  @HasMany(() => Product)
  products!: Product[];

  @HasMany(() => Branch)
  branches!: Branch[];

  @BelongsToMany(() => User, () => UserStore)
  users!: User[];
}

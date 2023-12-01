import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { IBanner } from "../../domain/models/banner";
import { User } from "./user";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "banner",
  modelName: "Banner",
})
export class Banner extends Model<IBanner> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  subTitle!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  image!: string;

  @ForeignKey(() => User) // foreign key
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User, "userId")
  user!: User;
}

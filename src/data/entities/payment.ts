import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { User } from "./user";
import { IPayment } from "../../domain/models/payment";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "payment",
  modelName: "Payment"
})
export class Payment extends Model<IPayment> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
  })
  @ForeignKey(() => User)
  userId!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  orderNo!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  cellPhone!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  status!: string;

  @BelongsTo(() => User)
  user!: User;
}
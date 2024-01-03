import {
  Table,
  Model,
  Column,
  DataType, 
  BelongsToMany,
} from "sequelize-typescript";
import { Product } from "./product";
import { IOrder } from "../../domain/models/order";
import { ProductOrder } from "./product-order";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "order",
  modelName: "Order"
})
export class Order extends Model<IOrder> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true
  })
  userId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalQtty!: number;

  @Column({
    type: DataType.INTEGER,
  })
  discount!: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  totalAmount!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  orderNo!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  username!: string;

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
  
  // Define the many-to-many relationship with Product
  @BelongsToMany(() => Product, () => ProductOrder)
  products!: Product[];
}

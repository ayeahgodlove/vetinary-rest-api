import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import { Product } from "./product";
import { Order } from "./order";
import { IProductOrder } from "../../domain/models/product-order";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "productOrder",
  modelName: "ProductOrder",
})
export class ProductOrder extends Model<IProductOrder> {
  @ForeignKey(() => Product)
  @Column
  productId!: string;

  @ForeignKey(() => Order)
  @Column
  orderId!: string;
}

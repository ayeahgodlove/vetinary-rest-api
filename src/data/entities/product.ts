import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from "sequelize-typescript";
import { IProduct } from "../../domain/models/product";
import { Store } from "./store";
import { Category } from "./category";
import { ProductReview } from "./product-review";
import { Order } from "./order";
import { ProductOrder } from "./product-order";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "product",
})
export class Product extends Model<IProduct> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    references: {
      model: Category,
      key: "id",
    },
  })
  @ForeignKey(() => Category)
  categoryId!: string;

  @ForeignKey(() => Store) // foreign key
  @Column
  storeId!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    unique: false,
  })
  amount!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  shortDescription!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  qtty!: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  productImages!: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  tags!: string[];


  @HasMany(() => ProductReview)
  productReviews!: ProductReview[];

  // relationships

  @BelongsTo(() => Store, "storeId")
  store!: Store;

  // one-to-one relationships
  @BelongsTo(() => Category)
  category!: Category;

  @BelongsToMany(() => Order, () => ProductOrder)
  orders!: Order[];
}

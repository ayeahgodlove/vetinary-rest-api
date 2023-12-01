import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user";
import { IProductReview } from "../../domain/models/product-review";
import { Product } from "./product";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "product_review",
})
export class ProductReview extends Model<IProductReview> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  productId!: string;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  userId!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Product, "productId")
  product!: Product
}

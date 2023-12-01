import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { IProductImage } from "../../domain/models/product-image";
import { Product } from "./product";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "product_image",
})
export class ProductImage extends Model<IProductImage> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @ForeignKey(() => Product) // foreign key
  @Column
  productId!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  productName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  imageUrl!: string;

  // relationships
  @BelongsTo(() => Product, "productId")
  product!: Product;
}

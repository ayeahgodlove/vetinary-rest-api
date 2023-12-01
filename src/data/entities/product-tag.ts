import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { IProductTag } from "../../domain/models/product-tag";
import { Product } from "./product";
import { Tag } from "./tag";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "productTag",
  modelName: "ProductTag",
})
export class ProductTag extends Model<IProductTag> {
  @ForeignKey(() => Product)
  @Column
  productId!: string;
  
  @ForeignKey(() => Tag)
  @Column
  tagId!: string;

}

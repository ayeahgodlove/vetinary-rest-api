import { Table, Model, Column, DataType } from "sequelize-typescript";
import { ISubCategory } from "../../domain/models/sub-category";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "subCategory",
  modelName: "SubCategory",
})
export class SubCategory extends Model<ISubCategory> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;
}

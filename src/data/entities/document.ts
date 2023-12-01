import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { IDocument } from "../../domain/models/document";
import { User } from "./user";
import { Category } from "./category";
import { Tag } from "./tag";
import { DocumentTag } from "./document-tag";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "document",
  modelName: "Document", 
})
export class DocumentFile extends Model<IDocument> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  title!: string;

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

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  fileUrl!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  uploadDate!: Date;

  @ForeignKey(() => User) // foreign key
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => Category) // foreign key
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  categoryId!: string;

  @BelongsTo(() => Category, "categoryId")
  category!: Category;

  @BelongsTo(() => User, "userId")
  user!: User;

  @BelongsToMany(() => Tag, () => DocumentTag, "documentId", "tagId")
  tags!: Tag[];
}

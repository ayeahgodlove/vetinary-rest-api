import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { ITag } from "../../domain/models/tag";
import { Product } from "./product";
import { Post } from "./post";
import { PostTag } from "./post-tag";
import { DocumentFile } from "./document";
import { DocumentTag } from "./document-tag";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "tag",
  modelName: "Tag",
})
export class Tag extends Model<ITag> {
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

  @BelongsToMany(() => Post, () => PostTag)
  posts!: Post[];

  @BelongsToMany(() => DocumentFile, () => DocumentTag)
  documentFiles!: DocumentFile[];
}

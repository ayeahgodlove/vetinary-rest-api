import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { IPostTag } from "../../domain/models/post-tag";
import { Post } from "./post";
import { Tag } from "./tag";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "postTag",
  modelName: "PostTag",
})
export class PostTag extends Model<IPostTag> {
  @ForeignKey(() => Post) // foreign key
  @Column
  postId!: string;

  @ForeignKey(() => Tag) // foreign key
  @Column
  tagId!: string;
}

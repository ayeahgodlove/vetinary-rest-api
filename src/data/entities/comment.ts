import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { IComment } from "../../domain/models/comment";
import { User } from "./user";
import { Post } from "./post";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "comment",
  modelName: "Comment",
})
export class Comment extends Model<IComment> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @ForeignKey(() => User) // foreign key
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => Post) // foreign key
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  postId!: string;

  @Column({
    type: DataType.DATE,
  })
  publishedAt!: Date;

  @BelongsTo(() => Post, "postId")
  post!: Post;

  @BelongsTo(() => User, "userId")
  user!: User;

  // extra fields
  @ForeignKey(() => Comment) // foreign key
  @Column({
    allowNull: true, // Allow null values for parent_id
  })
  parent_id?: string;

  @BelongsTo(() => Comment, {
    foreignKey: "parent_id",
    constraints: false, // Disable constraints for parent_id
  })
  parent?: Comment;

  @HasMany(() => Comment, { foreignKey: "parent_id", as: "replies" })
  replies?: Comment[];
}

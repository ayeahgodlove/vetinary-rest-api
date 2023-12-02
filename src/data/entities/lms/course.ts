import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ICourse } from "../../../domain/models/lms/course";
import { User } from "../user";
import { Lesson } from "./lesson";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "course",
  modelName: "Course",
})
export class Course extends Model<ICourse> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  courseImage!: string;

  @ForeignKey(() => User) // foreign key
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  authorId!: string;

  @BelongsTo(() => User, "authorId")
  user!: User;

  @HasMany(() => Lesson)
  lessons!: Lesson[]; // One course has many lessons
}

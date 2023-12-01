import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ILesson } from "../../../domain/models/lms/lesson";
import { User } from "../user";
import { LessonReview } from "../lesson-review";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "lesson",
  modelName: "Lesson",
})
export class Lesson extends Model<ILesson> {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  duration!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  difficulty!: string;

  // // dependencies
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  prerequisites!: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  objectives!: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  keywords!: string[];

  // Additional properties
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  author!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  category!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  language!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  targetAudience!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  rating!: number;

  @ForeignKey(() => User) // foreign key
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  authorId!: string;

  @BelongsTo(() => User, "userId")
  user!: User;

  @HasMany(() => LessonReview)
  lessonReviews!: LessonReview[];

}
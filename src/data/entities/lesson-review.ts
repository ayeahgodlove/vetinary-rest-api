import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user";
import { ILessonReview } from "../../domain/models/lesson-review";
import { Lesson } from "./lms/lesson";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "lesson_review",
})
export class LessonReview extends Model<ILessonReview> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;


  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  lessonId!: string;


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

  @BelongsTo(() => Lesson, "lessonId")
  lesson!: Lesson;
}

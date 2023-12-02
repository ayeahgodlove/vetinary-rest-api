import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { IQuiz } from "../../../domain/models/lms/quiz";
import { User } from "../user";
import { Lesson } from "./lesson";

// id: string;
// question: string;
// answers: string[];
// correctAnswerIndex: number;

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "quiz",
  modelName: "Quiz",
})
export class Quiz extends Model<IQuiz> {
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
  question!: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  answers!: string[];

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  correctAnswerIndex!: number;

  @ForeignKey(() => Lesson) // foreign key
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    references: {
      model: Lesson,
      key: "id",
    },
  })
  lessonId!: string;

  @BelongsTo(() => Lesson, "lessonId")
  lesson!: Lesson; // Each lesson belongs to a single cou
}

import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { IEnrollment } from "../../../domain/models/lms/enrollment";
import { User } from "../user";
import { Course } from "./course";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "enrollment",
  modelName: "Enrollment",
})
export class Enrollment extends Model<IEnrollment> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  enrollmentDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  completionDate!: Date;

  @ForeignKey(() => User) // foreign key
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => Course) // foreign key
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  courseId!: string;

  @BelongsTo(() => User, "userId")
  user!: User;

  @BelongsTo(() => Course, "courseId")
  course!: Course;
}

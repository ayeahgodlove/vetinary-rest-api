import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../user";
import { IConsultation } from "../../../domain/models/health/consultation";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "consultation",
  modelName: "Consultation",
})
export class Consultation extends Model<IConsultation> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column
  startDate!: Date;

  @Column
  endDate!: Date;

  @Column
  diagnosis!: string;

  // foreign key
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  petOwnerId!: string; //targets among users with vet role

  // foreign key
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  vetDoctorId!: string; //targets among users with doctors role

  @BelongsTo(() => User)
  user!: User;
}

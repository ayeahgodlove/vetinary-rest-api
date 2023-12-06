import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../user";
import { IAppointment } from "../../../domain/models/health/appointment";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "appointment",
  modelName: "Appointment",
})
export class Appointment extends Model<IAppointment> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

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

  @Column
  appointmentDateTime!: Date;

  @Column
  durationMinutes!: number;

  @Column
  isConfirmed!: boolean;

  @BelongsTo(() => User)
  user!: User;
}

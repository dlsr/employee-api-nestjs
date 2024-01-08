import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DepartmentModel } from '../../../../department/infra/database/sequelize/department.model';

export type EmployeeModelProps = {
  employee_id: string;
  first_name: string;
  last_name: string;
  hire_date: Date;
  department_id: string;
  phone: string;
  address: string;
  created_at: Date;
};

@Table({ tableName: 'employees', timestamps: false })
export class EmployeeModel extends Model<EmployeeModelProps> {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUID })
  declare employee_id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare first_name: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare last_name: string;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare hire_date: Date;

  @ForeignKey(() => DepartmentModel)
  @Column({ allowNull: false, type: DataType.UUID })
  declare department_id: string;

  @Column({ allowNull: false, type: DataType.STRING(10) })
  declare phone: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare address: string;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;

  @BelongsTo(() => DepartmentModel)
  declare department: DepartmentModel;
}

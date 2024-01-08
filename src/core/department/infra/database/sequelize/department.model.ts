import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type DepartmentModelProps = {
  department_id: string;
  name: string;
  created_at: Date;
};

@Table({ tableName: 'departments', timestamps: false })
export class DepartmentModel extends Model<DepartmentModelProps> {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUID })
  declare department_id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;
}

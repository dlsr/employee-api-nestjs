import { Employee } from '../../../domain/employee.agregate';

export type EmployeeOutput = {
  id: string;
  first_name: string;
  last_name: string;
  hire_date: string;
  department_id: string;
  phone: string;
  address: string;
  created_at: string;
};

export class EmployeeOutputMapper {
  static toOutput(entity: Employee): EmployeeOutput {
    const { employee_id, department_id, ...otherProps } = entity.toJSON();
    return {
      id: employee_id,
      department_id,
      ...otherProps,
    };
  }
}

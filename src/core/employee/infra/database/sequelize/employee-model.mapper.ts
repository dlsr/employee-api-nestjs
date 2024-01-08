import { DepartmentId } from '../../../../department/domain/department.aggregate';
import { Employee, EmployeeId } from '../../../domain/employee.agregate';
import { EmployeeModel } from './employee.model';

export class EmployeeModelMapper {
  static toModel(entity: Employee): EmployeeModel {
    return EmployeeModel.build({
      employee_id: entity.employee_id.id,
      first_name: entity.first_name,
      last_name: entity.last_name,
      hire_date: new Date(entity.hire_date),
      department_id: entity.department_id.id,
      phone: entity.phone,
      address: entity.address,
      created_at: new Date(entity.created_at),
    });
  }

  static toEntity(model: EmployeeModel): Employee {
    return new Employee({
      employee_id: new EmployeeId(model.employee_id),
      first_name: model.first_name,
      last_name: model.last_name,
      hire_date: model.hire_date.toISOString(),
      department_id: new DepartmentId(model.department_id),
      phone: model.phone,
      address: model.address,
      created_at: model.created_at.toISOString(),
    });
  }
}

import {
  Department,
  DepartmentId,
} from '../../../../department/domain/department.aggregate';
import { IDepartmentRepository } from '../../../../department/domain/department.repository';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { EntityValidationError } from '../../../../shared/domain/validators/entity-validation-error';
import { Employee } from '../../../domain/employee.agregate';
import { IEmployeeRepository } from '../../../domain/employee.repository';
import { CreateEmployeeInput } from './create-employee.input';

export class CreateEmployeeUseCase
  implements IUseCase<CreateEmployeeInput, CreateEmployeeOutput>
{
  constructor(
    private readonly employeeRepo: IEmployeeRepository,
    private readonly departmentRepo: IDepartmentRepository,
  ) {}

  async execute(input: CreateEmployeeInput): Promise<CreateEmployeeOutput> {
    const { department_id, ...newInput } = input;
    const foundDepartment = await this.departmentRepo.findById(
      new DepartmentId(department_id),
    );

    if (!foundDepartment) {
      throw new NotFoundError(department_id, Department);
    }

    const employee = Employee.create({
      ...newInput,
      department_id: foundDepartment.department_id,
    });

    if (employee.notification.hasErrors()) {
      throw new EntityValidationError(employee.notification.toJSON());
    }

    await this.employeeRepo.insert(employee);
    return {
      id: employee.employee_id.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      hire_date: employee.hire_date,
      department_id: employee.department_id.id,
      phone: employee.phone,
      address: employee.address,
      created_at: employee.created_at,
    };
  }
}

export type CreateEmployeeOutput = {
  id: string;
  first_name: string;
  last_name: string;
  hire_date: string;
  department_id: string;
  phone: string;
  address: string;
  created_at: string;
};

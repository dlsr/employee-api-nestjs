import {
  Department,
  DepartmentId,
} from '../../../../department/domain/department.aggregate';
import { IDepartmentRepository } from '../../../../department/domain/department.repository';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Employee, EmployeeId } from '../../../domain/employee.agregate';
import { IEmployeeRepository } from '../../../domain/employee.repository';
import {
  EmployeeOutput,
  EmployeeOutputMapper,
} from '../common/employee-output.mapper';
import { UpdateEmployeeInput } from './update-employee.input';

export class UpdateEmployeeUseCase
  implements IUseCase<UpdateEmployeeInput, UpdateEmployeeOutput>
{
  constructor(
    private employeeRepo: IEmployeeRepository,
    private departmentRepo: IDepartmentRepository,
  ) {}

  async execute(input: UpdateEmployeeInput): Promise<UpdateEmployeeOutput> {
    const employeeId = new EmployeeId(input.id);
    const employee = await this.employeeRepo.findById(employeeId);

    if (!employee) {
      throw new NotFoundError(input.id, Employee);
    }

    input.first_name && employee.changeFirstName(input.first_name);
    input.last_name && employee.changeLastName(input.last_name);
    input.hire_date && employee.changeHireDate(input.hire_date);
    input.phone && employee.changePhone(input.phone);
    input.address && employee.changeAddress(input.address);

    if (input.department_id) {
      const foundDepartment = await this.departmentRepo.findById(
        new DepartmentId(input.department_id),
      );
      if (!foundDepartment) {
        throw new NotFoundError(input.department_id, Department);
      }
      employee.changeDepartment(foundDepartment.department_id);
    }

    await this.employeeRepo.update(employee);
    return EmployeeOutputMapper.toOutput(employee);
  }
}

export type UpdateEmployeeOutput = EmployeeOutput;

import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Employee, EmployeeId } from '../../../domain/employee.agregate';
import { IEmployeeRepository } from '../../../domain/employee.repository';
import {
  EmployeeOutput,
  EmployeeOutputMapper,
} from '../common/employee-output.mapper';

export class GetEmployeeUseCase
  implements IUseCase<GetEmployeeInput, GetEmployeeOutput>
{
  constructor(private employeeRepo: IEmployeeRepository) {}

  async execute(input: GetEmployeeInput): Promise<GetEmployeeOutput> {
    const employeeId = new EmployeeId(input.id);
    const employee = await this.employeeRepo.findById(employeeId);
    if (!employee) {
      throw new NotFoundError(input.id, Employee);
    }

    return EmployeeOutputMapper.toOutput(employee);
  }
}

export type GetEmployeeInput = {
  id: string;
};

export type GetEmployeeOutput = EmployeeOutput;

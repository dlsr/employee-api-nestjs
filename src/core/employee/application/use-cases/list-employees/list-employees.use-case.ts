import { IUseCase } from '../../../../shared/application/use-case.interface';
import { IEmployeeRepository } from '../../../domain/employee.repository';
import {
  EmployeeOutput,
  EmployeeOutputMapper,
} from '../common/employee-output.mapper';

export class ListEmployeesUseCase
  implements IUseCase<ListEmployeesInput, ListEmployeesOutput>
{
  constructor(private employeeRepo: IEmployeeRepository) {}

  async execute(): Promise<ListEmployeesOutput> {
    return (await this.employeeRepo.findAll())?.map((employee) => {
      return EmployeeOutputMapper.toOutput(employee);
    });
  }
}

export type ListEmployeesInput = Map<string, never>;
export type ListEmployeesOutput = EmployeeOutput[];

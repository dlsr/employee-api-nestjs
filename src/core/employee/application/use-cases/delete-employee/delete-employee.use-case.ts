import { IUseCase } from '../../../../shared/application/use-case.interface';
import { EmployeeId } from '../../../domain/employee.agregate';
import { IEmployeeRepository } from '../../../domain/employee.repository';

export class DeleteEmployeeUseCase
  implements IUseCase<DeleteEmployeeInput, DeleteEmployeeOutput>
{
  constructor(private employeeRepo: IEmployeeRepository) {}

  async execute(input: DeleteEmployeeInput): Promise<DeleteEmployeeOutput> {
    const uuid = new EmployeeId(input.id);
    await this.employeeRepo.delete(uuid);
  }
}

export type DeleteEmployeeInput = {
  id: string;
};

type DeleteEmployeeOutput = void;

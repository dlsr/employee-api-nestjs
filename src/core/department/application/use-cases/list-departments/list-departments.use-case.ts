import { IUseCase } from '../../../../shared/application/use-case.interface';
import { IDepartmentRepository } from '../../../domain/department.repository';
import { DepartmentOutput } from '../common/department-output';

export class ListDepartmentsUseCase
  implements IUseCase<ListDepartmentsInput, ListDepartmentsOutput>
{
  constructor(private departmentRepo: IDepartmentRepository) {}

  async execute(): Promise<ListDepartmentsOutput> {
    return (await this.departmentRepo.findAll())?.map((department) => {
      return {
        id: department.department_id.id,
        name: department.name,
        created_at: department.created_at,
      };
    });
  }
}

export type ListDepartmentsInput = Map<string, never>;
export type ListDepartmentsOutput = DepartmentOutput[];

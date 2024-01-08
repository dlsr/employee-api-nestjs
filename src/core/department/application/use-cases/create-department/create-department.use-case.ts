import { IUseCase } from '../../../../shared/application/use-case.interface';
import { EntityValidationError } from '../../../../shared/domain/validators/entity-validation-error';
import { Department } from '../../../domain/department.aggregate';
import { IDepartmentRepository } from '../../../domain/department.repository';
import { CreateDepartmentInput } from './create-department.input';

export class CreateDepartmentUseCase
  implements IUseCase<CreateDepartmentInput, CreateDepartmentOutput>
{
  constructor(private readonly departmentRepo: IDepartmentRepository) {}

  async execute(input: CreateDepartmentInput): Promise<CreateDepartmentOutput> {
    const department = Department.create(input);

    if (department.notification.hasErrors()) {
      throw new EntityValidationError(department.notification.toJSON());
    }

    await this.departmentRepo.insert(department);
    return {
      id: department.department_id.id,
      name: department.name,
      created_at: department.created_at,
    };
  }
}

export type CreateDepartmentOutput = {
  id: string;
  name: string;
  created_at: string;
};

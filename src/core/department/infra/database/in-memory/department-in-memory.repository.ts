import { InMemoryRepository } from '../../../../shared/infra/database/in-memory/in-memory.repository';
import { Department, DepartmentId } from '../../../domain/department.aggregate';

export class DepartmentInMemoryRepository extends InMemoryRepository<
  Department,
  DepartmentId
> {
  getEntity(): new (...args: any[]) => Department {
    return Department;
  }
}

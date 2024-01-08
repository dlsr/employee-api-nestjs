import { InMemoryRepository } from '../../../../shared/infra/database/in-memory/in-memory.repository';
import { Employee, EmployeeId } from '../../../domain/employee.agregate';

export class EmployeeInMemoryRepository extends InMemoryRepository<
  Employee,
  EmployeeId
> {
  getEntity(): new (...args: any[]) => Employee {
    return Employee;
  }
}

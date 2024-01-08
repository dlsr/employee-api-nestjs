import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { InvalidUuidError } from '../../../../../shared/domain/value-objects/uuid.vo';
import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { Employee, EmployeeId } from '../../../../domain/employee.agregate';
import { EmployeeInMemoryRepository } from '../../../../infra/database/in-memory/employee-in-memory.repository';
import { DeleteEmployeeUseCase } from '../delete-employee.use-case';

describe('DeleteEmployeeUseCase Unit Tests', () => {
  let useCase: DeleteEmployeeUseCase;
  let repository: EmployeeInMemoryRepository;

  beforeEach(() => {
    repository = new EmployeeInMemoryRepository();
    useCase = new DeleteEmployeeUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new InvalidUuidError(),
    );

    const employeeId = new EmployeeId();

    await expect(() => useCase.execute({ id: employeeId.id })).rejects.toThrow(
      new NotFoundError(employeeId.id, Employee),
    );
  });

  it('should delete an employee', async () => {
    const items = [new EmployeeFakeBuilder().build()];
    repository.items = items;
    await useCase.execute({
      id: items[0].employee_id.id,
    });
    expect(repository.items).toHaveLength(0);
  });
});

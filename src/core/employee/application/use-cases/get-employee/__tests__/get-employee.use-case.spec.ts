import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { InvalidUuidError } from '../../../../../shared/domain/value-objects/uuid.vo';
import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { Employee, EmployeeId } from '../../../../domain/employee.agregate';
import { EmployeeInMemoryRepository } from '../../../../infra/database/in-memory/employee-in-memory.repository';
import { GetEmployeeUseCase } from '../get-employee.use-case';

describe('GetEmployeeUseCase Unit Tests', () => {
  let useCase: GetEmployeeUseCase;
  let repository: EmployeeInMemoryRepository;

  beforeEach(() => {
    repository = new EmployeeInMemoryRepository();
    useCase = new GetEmployeeUseCase(repository);
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

  it('should returns a employee', async () => {
    const employee = new EmployeeFakeBuilder().build();
    repository.items = [employee];
    const spyFindById = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: employee.employee_id.id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].employee_id.id,
      created_at: repository.items[0].created_at,
      first_name: employee.first_name,
      last_name: employee.last_name,
      hire_date: employee.hire_date,
      department_id: employee.department_id.id,
      phone: employee.phone,
      address: employee.address,
    });
  });
});

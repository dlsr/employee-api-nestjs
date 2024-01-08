import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { EmployeeInMemoryRepository } from '../../../../infra/database/in-memory/employee-in-memory.repository';
import { ListEmployeesUseCase } from '../list-employees.use-case';

describe('ListEmployeesUseCase Unit Tests', () => {
  let useCase: ListEmployeesUseCase;
  let repository: EmployeeInMemoryRepository;

  beforeEach(() => {
    repository = new EmployeeInMemoryRepository();
    useCase = new ListEmployeesUseCase(repository);
  });

  it('should return a empty list when entity is not found', async () => {
    const output = await useCase.execute();
    expect(output.length).toBe(0);
  });

  it('should returns a list of employees', async () => {
    const entity1 = new EmployeeFakeBuilder().build();
    const entity2 = new EmployeeFakeBuilder().build();
    repository.items = [entity1, entity2];
    const spyFindById = jest.spyOn(repository, 'findAll');
    const output = await useCase.execute();
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output.length).toBe(2);
    expect(output[0]).toStrictEqual({
      id: repository.items[0].employee_id.id,
      created_at: repository.items[0].created_at,
      first_name: entity1.first_name,
      last_name: entity1.last_name,
      hire_date: entity1.hire_date,
      department_id: entity1.department_id.id,
      phone: entity1.phone,
      address: entity1.address,
    });

    expect(output[1]).toStrictEqual({
      id: repository.items[1].employee_id.id,
      created_at: repository.items[1].created_at,
      first_name: entity2.first_name,
      last_name: entity2.last_name,
      hire_date: entity2.hire_date,
      department_id: entity2.department_id.id,
      phone: entity2.phone,
      address: entity2.address,
    });
  });
});

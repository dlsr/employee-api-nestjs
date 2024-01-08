import { DepartmentFakeBuilder } from '../../../../domain/department-fake.builder';
import { DepartmentInMemoryRepository } from '../../../../infra/database/in-memory/department-in-memory.repository';
import { ListDepartmentsUseCase } from '../list-departments.use-case';

describe('ListDepartmentsUseCase Unit Tests', () => {
  let useCase: ListDepartmentsUseCase;
  let repository: DepartmentInMemoryRepository;

  beforeEach(() => {
    repository = new DepartmentInMemoryRepository();
    useCase = new ListDepartmentsUseCase(repository);
  });

  it('should return a empty list when entity is not found', async () => {
    const output = await useCase.execute();
    expect(output.length).toBe(0);
  });

  it('should returns a list of departments', async () => {
    const entity1 = new DepartmentFakeBuilder()
      .withName('Department 1')
      .build();
    const entity2 = new DepartmentFakeBuilder()
      .withName('Department 2')
      .build();
    repository.items = [entity1, entity2];
    const spyFindById = jest.spyOn(repository, 'findAll');
    const output = await useCase.execute();
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output.length).toBe(2);
    expect(output[0]).toStrictEqual({
      id: repository.items[0].department_id.id,
      created_at: repository.items[0].created_at,
      name: entity1.name,
    });
    expect(output[1]).toStrictEqual({
      id: repository.items[1].department_id.id,
      created_at: repository.items[1].created_at,
      name: entity2.name,
    });
  });
});

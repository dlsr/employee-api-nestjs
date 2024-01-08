import { DepartmentFakeBuilder } from '../../../../domain/department-fake.builder';
import { DepartmentInMemoryRepository } from '../../../../infra/database/in-memory/department-in-memory.repository';
import { CreateDepartmentUseCase } from '../create-department.use-case';

describe('CreateDepartmentUseCase Unit Tests', () => {
  let useCase: CreateDepartmentUseCase;
  let repository: DepartmentInMemoryRepository;

  beforeEach(() => {
    repository = new DepartmentInMemoryRepository();
    useCase = new CreateDepartmentUseCase(repository);
  });

  it('should throw an error when aggregate is not valid', async () => {
    const input = {};
    await expect(() => useCase.execute(input as any)).rejects.toThrow(
      'Entity Validation Error',
    );
  });

  it('should create a department', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    const department = new DepartmentFakeBuilder().build();
    const output1 = await useCase.execute(department);
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output1).toStrictEqual({
      id: department.department_id.id,
      name: department.name,
      created_at: department.created_at,
    });
  });
});

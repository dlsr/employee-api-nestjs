import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { DepartmentFakeBuilder } from '../../../../domain/department-fake.builder';
import { DepartmentSequelizeRepository } from '../../../../infra/database/sequelize/department-sequelize.repository';
import { DepartmentModel } from '../../../../infra/database/sequelize/department.model';
import { ListDepartmentsUseCase } from '../list-departments.use-case';
describe('ListDepartmentsUseCase Unit Tests', () => {
  let useCase: ListDepartmentsUseCase;
  let repository: DepartmentSequelizeRepository;

  setupSequelize({ models: [DepartmentModel] });

  beforeEach(() => {
    repository = new DepartmentSequelizeRepository(DepartmentModel);
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
    await repository.insert(entity1);
    await repository.insert(entity2);
    const output = await useCase.execute();
    expect(output.length).toBe(2);
    expect(output[0]).toStrictEqual({
      id: entity1.department_id.id,
      created_at: output[0].created_at,
      name: entity1.name,
    });

    expect(output[1]).toStrictEqual({
      id: entity2.department_id.id,
      created_at: output[1].created_at,
      name: entity2.name,
    });
  });
});

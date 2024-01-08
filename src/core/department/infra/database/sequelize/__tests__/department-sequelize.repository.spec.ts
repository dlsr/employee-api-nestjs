import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { DepartmentFakeBuilder } from '../../../../domain/department-fake.builder';
import { DepartmentId } from '../../../../domain/department.aggregate';
import { DepartmentSequelizeRepository } from '../department-sequelize.repository';
import { DepartmentModel } from '../department.model';

describe('DepartmentSequelizeRepository Integration Test', () => {
  let repository: DepartmentSequelizeRepository;
  setupSequelize({ models: [DepartmentModel] });

  beforeEach(async () => {
    repository = new DepartmentSequelizeRepository(DepartmentModel);
  });

  it('should inserts a new entity', async () => {
    const department = new DepartmentFakeBuilder().build();
    await repository.insert(department);
    const entity = await repository.findById(department.department_id);
    expect(entity!.toJSON()).toStrictEqual(department.toJSON());
  });

  it('should finds an entity by id', async () => {
    let entityFound = await repository.findById(new DepartmentId());
    expect(entityFound).toBeNull();

    const department = new DepartmentFakeBuilder().build();
    await repository.insert(department);
    entityFound = await repository.findById(department.department_id);
    expect(department.toJSON()).toStrictEqual(entityFound!.toJSON());
  });

  it('should return all employees', async () => {
    const employee = new DepartmentFakeBuilder().build();
    await repository.insert(employee);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([employee]));
  });
});

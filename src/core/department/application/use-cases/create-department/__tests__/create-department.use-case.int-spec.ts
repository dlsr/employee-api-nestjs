import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { DepartmentFakeBuilder } from '../../../../domain/department-fake.builder';
import { DepartmentId } from '../../../../domain/department.aggregate';
import { DepartmentSequelizeRepository } from '../../../../infra/database/sequelize/department-sequelize.repository';
import { DepartmentModel } from '../../../../infra/database/sequelize/department.model';
import { CreateDepartmentUseCase } from '../create-department.use-case';

describe('CreateDepartmentUseCase Unit Tests', () => {
  let useCase: CreateDepartmentUseCase;
  let repository: DepartmentSequelizeRepository;

  setupSequelize({ models: [DepartmentModel] });

  beforeEach(() => {
    repository = new DepartmentSequelizeRepository(DepartmentModel);
    useCase = new CreateDepartmentUseCase(repository);
  });

  it('should create a category', async () => {
    const department = new DepartmentFakeBuilder().build();
    const output = await useCase.execute({
      ...department,
    });
    const entity = await repository.findById(new DepartmentId(output.id));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { department_id, ...entityWithoutId } = entity!.toJSON();
    expect(output).toStrictEqual({
      id: entity?.department_id.id,
      ...entityWithoutId,
    });
  });
});

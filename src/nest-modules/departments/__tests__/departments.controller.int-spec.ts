import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../../config/config.module';
import { DatabaseModule } from '../../database/database.module';
import { DepartmentsModule } from '../departments.module';
import { DepartmentsController } from '../departments.controller';
import { DEPARTMENT_PROVIDERS } from '../departments.providers';
import { ListDepartmentsUseCase } from '../../../core/department/application/use-cases/list-departments/list-departments.use-case';
import { CreateDepartmentUseCase } from '../../../core/department/application/use-cases/create-department/create-department.use-case';
import { DepartmentFakeBuilder } from '../../../core/department/domain/department-fake.builder';
import { IDepartmentRepository } from '../../../core/department/domain/department.repository';
import { DepartmentId } from '../../../core/department/domain/department.aggregate';
import { CreateDepartmentE2EFixture } from '../testing/department-fixture.e2e';

describe('DepartmentsController Integration Tests', () => {
  let controller: DepartmentsController;
  let repository: IDepartmentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, DepartmentsModule],
    }).compile();
    controller = module.get<DepartmentsController>(DepartmentsController);
    repository = module.get<IDepartmentRepository>(
      DEPARTMENT_PROVIDERS.REPOSITORIES.DEPARTMENT_REPOSITORY.provide,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(CreateDepartmentUseCase);
    expect(controller['listUseCase']).toBeInstanceOf(ListDepartmentsUseCase);
  });

  describe('should create a department', () => {
    const arrange = CreateDepartmentE2EFixture.arrangeForCreate();
    it.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const result = await controller.create(send_data);
        const entity = await repository.findById(new DepartmentId(result.id));
        expect(entity!.toJSON()).toStrictEqual({
          department_id: result.id,
          created_at: result.created_at,
          ...expected,
        });
      },
    );
  });

  it('should list all departments', async () => {
    const department = new DepartmentFakeBuilder().build();
    await repository.insert(department);
    const [output] = await controller.findAll();
    expect(output.id).toBe(department.department_id.id);
    expect(output.name).toBe(department.name);
    expect(output.created_at).toStrictEqual(department.created_at);
  });
});

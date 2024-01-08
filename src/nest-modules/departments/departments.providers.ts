import { getModelToken } from '@nestjs/sequelize';
import { DepartmentInMemoryRepository } from '../../core/department/infra/database/in-memory/department-in-memory.repository';
import { DepartmentSequelizeRepository } from '../../core/department/infra/database/sequelize/department-sequelize.repository';
import { DepartmentModel } from '../../core/department/infra/database/sequelize/department.model';
import { CreateDepartmentUseCase } from '../../core/department/application/use-cases/create-department/create-department.use-case';
import { IDepartmentRepository } from '../../core/department/domain/department.repository';
import { ListDepartmentsUseCase } from '../../core/department/application/use-cases/list-departments/list-departments.use-case';

export const REPOSITORIES = {
  DEPARTMENT_REPOSITORY: {
    provide: 'DepartmentRepository',
    useExisting: DepartmentSequelizeRepository,
  },
  DEPARTMENT_IN_MEMORY_REPOSITORY: {
    provide: DepartmentInMemoryRepository,
    useClass: DepartmentInMemoryRepository,
  },
  DEPARTMENT_SEQUELIZE_REPOSITORY: {
    provide: DepartmentSequelizeRepository,
    useFactory: (departmentModel: typeof DepartmentModel) => {
      return new DepartmentSequelizeRepository(departmentModel);
    },
    inject: [getModelToken(DepartmentModel)],
  },
};

export const USE_CASES = {
  CREATE_DEPARTMENT_USE_CASE: {
    provide: CreateDepartmentUseCase,
    useFactory: (departmentRepo: IDepartmentRepository) => {
      return new CreateDepartmentUseCase(departmentRepo);
    },
    inject: [REPOSITORIES.DEPARTMENT_REPOSITORY.provide],
  },
  LIST_DEPARTMENTS_USE_CASE: {
    provide: ListDepartmentsUseCase,
    useFactory: (departmentRepo: IDepartmentRepository) => {
      return new ListDepartmentsUseCase(departmentRepo);
    },
    inject: [REPOSITORIES.DEPARTMENT_REPOSITORY.provide],
  },
};

export const DEPARTMENT_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};

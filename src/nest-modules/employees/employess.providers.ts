import { getModelToken } from '@nestjs/sequelize';
import { EmployeeInMemoryRepository } from '../../core/employee/infra/database/in-memory/employee-in-memory.repository';
import { EmployeeSequelizeRepository } from '../../core/employee/infra/database/sequelize/employee-sequelize.repository';
import { EmployeeModel } from '../../core/employee/infra/database/sequelize/employee.model';
import { CreateEmployeeUseCase } from '../../core/employee/application/use-cases/create-employee/create-employee.use-case';
import { IEmployeeRepository } from '../../core/employee/domain/employee.repository';
import { UpdateEmployeeUseCase } from '../../core/employee/application/use-cases/update-employee/update-employee.use-case';
import { GetEmployeeUseCase } from '../../core/employee/application/use-cases/get-employee/get-employee.use-case';
import { DeleteEmployeeUseCase } from '../../core/employee/application/use-cases/delete-employee/delete-employee.use-case';
import { ListEmployeesUseCase } from '../../core/employee/application/use-cases/list-employees/list-employees.use-case';
import { IDepartmentRepository } from '../../core/department/domain/department.repository';
import { DEPARTMENT_PROVIDERS } from '../departments/departments.providers';

export const REPOSITORIES = {
  EMPLOYEE_REPOSITORY: {
    provide: 'EmployeeRepository',
    useExisting: EmployeeSequelizeRepository,
  },
  EMPLOYEE_IN_MEMORY_REPOSITORY: {
    provide: EmployeeInMemoryRepository,
    useClass: EmployeeInMemoryRepository,
  },
  EMPLOYEE_SEQUELIZE_REPOSITORY: {
    provide: EmployeeSequelizeRepository,
    useFactory: (employeeModel: typeof EmployeeModel) => {
      return new EmployeeSequelizeRepository(employeeModel);
    },
    inject: [getModelToken(EmployeeModel)],
  },
};

export const USE_CASES = {
  CREATE_EMPLOYEE_USE_CASE: {
    provide: CreateEmployeeUseCase,
    useFactory: (
      employeeRepo: IEmployeeRepository,
      departmentRepo: IDepartmentRepository,
    ) => {
      return new CreateEmployeeUseCase(employeeRepo, departmentRepo);
    },
    inject: [
      REPOSITORIES.EMPLOYEE_REPOSITORY.provide,
      DEPARTMENT_PROVIDERS.REPOSITORIES.DEPARTMENT_REPOSITORY.provide,
    ],
  },
  UPDATE_EMPLOYEE_USE_CASE: {
    provide: UpdateEmployeeUseCase,
    useFactory: (
      employeeRepo: IEmployeeRepository,
      departmentRepo: IDepartmentRepository,
    ) => {
      return new UpdateEmployeeUseCase(employeeRepo, departmentRepo);
    },
    inject: [
      REPOSITORIES.EMPLOYEE_REPOSITORY.provide,
      DEPARTMENT_PROVIDERS.REPOSITORIES.DEPARTMENT_REPOSITORY.provide,
    ],
  },
  LIST_EMPLOYEE_USE_CASE: {
    provide: ListEmployeesUseCase,
    useFactory: (employeeRepo: IEmployeeRepository) => {
      return new ListEmployeesUseCase(employeeRepo);
    },
    inject: [REPOSITORIES.EMPLOYEE_REPOSITORY.provide],
  },
  GET_EMPLOYEE_USE_CASE: {
    provide: GetEmployeeUseCase,
    useFactory: (employeeRepo: IEmployeeRepository) => {
      return new GetEmployeeUseCase(employeeRepo);
    },
    inject: [REPOSITORIES.EMPLOYEE_REPOSITORY.provide],
  },
  DELETE_EMPLOYEE_USE_CASE: {
    provide: DeleteEmployeeUseCase,
    useFactory: (employeeRepo: IEmployeeRepository) => {
      return new DeleteEmployeeUseCase(employeeRepo);
    },
    inject: [REPOSITORIES.EMPLOYEE_REPOSITORY.provide],
  },
};

export const EMPLOYEE_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};

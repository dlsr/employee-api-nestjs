import { DepartmentFakeBuilder } from '../../../../../department/domain/department-fake.builder';
import { DepartmentSequelizeRepository } from '../../../../../department/infra/database/sequelize/department-sequelize.repository';
import { DepartmentModel } from '../../../../../department/infra/database/sequelize/department.model';
import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { EmployeeSequelizeRepository } from '../../../../infra/database/sequelize/employee-sequelize.repository';
import { EmployeeModel } from '../../../../infra/database/sequelize/employee.model';
import { ListEmployeesUseCase } from '../list-employees.use-case';

describe('ListEmployeesUseCase Unit Tests', () => {
  let useCase: ListEmployeesUseCase;
  let employeeRepo: EmployeeSequelizeRepository;
  let departmentRepo: DepartmentSequelizeRepository;

  setupSequelize({ models: [EmployeeModel, DepartmentModel] });

  beforeEach(() => {
    employeeRepo = new EmployeeSequelizeRepository(EmployeeModel);
    departmentRepo = new DepartmentSequelizeRepository(DepartmentModel);
    useCase = new ListEmployeesUseCase(employeeRepo);
  });

  it('should return a empty list when entity is not found', async () => {
    const output = await useCase.execute();
    expect(output.length).toBe(0);
  });

  it('should returns a list of employees', async () => {
    const department = new DepartmentFakeBuilder().build();
    const [entity1, entity2] = [
      new EmployeeFakeBuilder()
        .withDepartmentId(department.department_id)
        .build(),
      new EmployeeFakeBuilder()
        .withDepartmentId(department.department_id)
        .build(),
    ];
    await departmentRepo.insert(department);
    await employeeRepo.insert(entity1);
    await employeeRepo.insert(entity2);
    const output = await useCase.execute();
    expect(output.length).toBe(2);
    expect(output[0]).toStrictEqual({
      id: entity1.employee_id.id,
      created_at: entity1.created_at,
      first_name: entity1.first_name,
      last_name: entity1.last_name,
      hire_date: entity1.hire_date,
      department_id: entity1.department_id.id,
      phone: entity1.phone,
      address: entity1.address,
    });

    expect(output[1]).toStrictEqual({
      id: entity2.employee_id.id,
      created_at: entity2.created_at,
      first_name: entity2.first_name,
      last_name: entity2.last_name,
      hire_date: entity2.hire_date,
      department_id: entity2.department_id.id,
      phone: entity2.phone,
      address: entity2.address,
    });
  });
});

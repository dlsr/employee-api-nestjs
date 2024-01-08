import { DepartmentFakeBuilder } from '../../../../../department/domain/department-fake.builder';
import { DepartmentSequelizeRepository } from '../../../../../department/infra/database/sequelize/department-sequelize.repository';
import { DepartmentModel } from '../../../../../department/infra/database/sequelize/department.model';
import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { Employee, EmployeeId } from '../../../../domain/employee.agregate';
import { EmployeeSequelizeRepository } from '../../../../infra/database/sequelize/employee-sequelize.repository';
import { EmployeeModel } from '../../../../infra/database/sequelize/employee.model';
import { GetEmployeeUseCase } from '../get-employee.use-case';

describe('GetEmployeeUseCase Integration Tests', () => {
  let useCase: GetEmployeeUseCase;
  let employeeRepo: EmployeeSequelizeRepository;
  let departmentRepo: DepartmentSequelizeRepository;

  setupSequelize({ models: [EmployeeModel, DepartmentModel] });

  beforeEach(() => {
    employeeRepo = new EmployeeSequelizeRepository(EmployeeModel);
    departmentRepo = new DepartmentSequelizeRepository(DepartmentModel);
    useCase = new GetEmployeeUseCase(employeeRepo);
  });

  it('should throws error when entity not found', async () => {
    const employeeId = new EmployeeId();
    await expect(() => useCase.execute({ id: employeeId.id })).rejects.toThrow(
      new NotFoundError(employeeId.id, Employee),
    );
  });

  it('should returns a category', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();
    await departmentRepo.insert(department);
    await employeeRepo.insert(employee);
    const output = await useCase.execute({ id: employee.employee_id.id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { employee_id, ...newEntity } = employee.toJSON();
    expect(output).toStrictEqual({
      id: employee.employee_id.id,
      ...newEntity,
    });
  });
});

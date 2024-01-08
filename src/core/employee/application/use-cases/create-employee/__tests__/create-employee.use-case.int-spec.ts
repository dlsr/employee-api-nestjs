import { DepartmentFakeBuilder } from '../../../../../department/domain/department-fake.builder';
import { DepartmentSequelizeRepository } from '../../../../../department/infra/database/sequelize/department-sequelize.repository';
import { DepartmentModel } from '../../../../../department/infra/database/sequelize/department.model';
import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { EmployeeId } from '../../../../domain/employee.agregate';
import { EmployeeSequelizeRepository } from '../../../../infra/database/sequelize/employee-sequelize.repository';
import { EmployeeModel } from '../../../../infra/database/sequelize/employee.model';
import { CreateEmployeeUseCase } from '../create-employee.use-case';

describe('CreateEmployeeUseCase Unit Tests', () => {
  let useCase: CreateEmployeeUseCase;
  let employeeRepository: EmployeeSequelizeRepository;
  let departmentRepo: DepartmentSequelizeRepository;

  setupSequelize({ models: [EmployeeModel, DepartmentModel] });

  beforeEach(() => {
    employeeRepository = new EmployeeSequelizeRepository(EmployeeModel);
    departmentRepo = new DepartmentSequelizeRepository(DepartmentModel);
    useCase = new CreateEmployeeUseCase(employeeRepository, departmentRepo);
  });

  it('should create an employee', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();
    await departmentRepo.insert(department);
    const output = await useCase.execute({
      first_name: employee.first_name,
      last_name: employee.last_name,
      hire_date: employee.hire_date,
      department_id: employee.department_id.id,
      phone: employee.phone,
      address: employee.address,
    });

    const entity = await employeeRepository.findById(new EmployeeId(output.id));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { employee_id, ...entityWithoutId } = entity!.toJSON();
    expect(output).toStrictEqual({
      id: entity?.employee_id.id,
      ...entityWithoutId,
    });
  });
});

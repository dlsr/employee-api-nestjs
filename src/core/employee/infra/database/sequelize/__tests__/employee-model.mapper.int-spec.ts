import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { EmployeeModelMapper } from '../employee-model.mapper';
import { EmployeeModel } from '../employee.model';
import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { DepartmentModel } from '../../../../../department/infra/database/sequelize/department.model';
import { DepartmentFakeBuilder } from '../../../../../department/domain/department-fake.builder';
import { IDepartmentRepository } from '../../../../../department/domain/department.repository';
import { DepartmentSequelizeRepository } from '../../../../../department/infra/database/sequelize/department-sequelize.repository';

describe('EmployeeModelMapper Integration Tests', () => {
  let departmentRepo: IDepartmentRepository;

  setupSequelize({ models: [EmployeeModel, DepartmentModel] });

  beforeEach(() => {
    departmentRepo = new DepartmentSequelizeRepository(DepartmentModel);
  });

  it('should convert an employee model to an employee aggregate', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();
    await departmentRepo.insert(department);

    const employeeModel = EmployeeModel.build({
      employee_id: employee.employee_id.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      hire_date: new Date(employee.hire_date),
      department_id: department.department_id.id,
      phone: employee.phone,
      address: employee.address,
      created_at: new Date(employee.created_at),
    });
    const aggregate = EmployeeModelMapper.toEntity(employeeModel);
    expect(aggregate.toJSON()).toStrictEqual(employee.toJSON());
  });

  it('should convert an employee entity to an employee model', () => {
    const entity = new EmployeeFakeBuilder().build();
    const model = EmployeeModelMapper.toModel(entity);
    expect({
      ...model.toJSON(),
    }).toStrictEqual({
      ...entity.toJSON(),
      department_id: entity.department_id.id,
      created_at: new Date(entity.created_at),
      hire_date: new Date(entity.hire_date),
    });
  });
});

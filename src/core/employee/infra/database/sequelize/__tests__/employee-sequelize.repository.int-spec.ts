import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { EmployeeModel } from '../employee.model';
import { EmployeeSequelizeRepository } from '../employee-sequelize.repository';
import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { Employee, EmployeeId } from '../../../../domain/employee.agregate';
import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { DepartmentModel } from '../../../../../department/infra/database/sequelize/department.model';
import { DepartmentSequelizeRepository } from '../../../../../department/infra/database/sequelize/department-sequelize.repository';
import { DepartmentFakeBuilder } from '../../../../../department/domain/department-fake.builder';

describe('EmployeeSequelizeRepository Integration Test', () => {
  let employeeRepo: EmployeeSequelizeRepository;
  let departmentRepo: DepartmentSequelizeRepository;
  setupSequelize({ models: [EmployeeModel, DepartmentModel] });

  beforeEach(async () => {
    employeeRepo = new EmployeeSequelizeRepository(EmployeeModel);
    departmentRepo = new DepartmentSequelizeRepository(DepartmentModel);
  });

  it('should inserts a new entity', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();

    await departmentRepo.insert(department);
    await employeeRepo.insert(employee);
    const entity = await employeeRepo.findById(employee.employee_id);
    expect(entity!.toJSON()).toStrictEqual(employee.toJSON());
  });

  it('should finds an entity by id', async () => {
    let entityFound = await employeeRepo.findById(new EmployeeId());
    expect(entityFound).toBeNull();

    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();

    await departmentRepo.insert(department);
    await employeeRepo.insert(employee);
    entityFound = await employeeRepo.findById(employee.employee_id);
    expect(employee.toJSON()).toStrictEqual(entityFound!.toJSON());
  });

  it('should return all employees', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();

    await departmentRepo.insert(department);
    await employeeRepo.insert(employee);
    const entities = await employeeRepo.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([employee]));
  });

  it('should throw error on update when a entity not found', async () => {
    const employee = new EmployeeFakeBuilder().build();
    await expect(employeeRepo.update(employee)).rejects.toThrow(
      new NotFoundError(employee.employee_id.id, Employee),
    );
  });

  it('should update a entity', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();

    await departmentRepo.insert(department);
    await employeeRepo.insert(employee);

    employee.changeFirstName('First name updated');
    await employeeRepo.update(employee);

    const entityFound = await employeeRepo.findById(employee.employee_id);
    expect(employee.toJSON()).toStrictEqual(entityFound!.toJSON());
  });

  it('should throw error on delete when a entity not found', async () => {
    const employeeId = new EmployeeId();
    await expect(employeeRepo.delete(employeeId)).rejects.toThrow(
      new NotFoundError(employeeId.id, Employee),
    );
  });

  it('should delete a entity', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();

    await departmentRepo.insert(department);
    await employeeRepo.insert(employee);
    await employeeRepo.delete(employee.employee_id);
    await expect(
      employeeRepo.findById(employee.employee_id),
    ).resolves.toBeNull();
  });
});

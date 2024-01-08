import { DepartmentFakeBuilder } from '../../../../../department/domain/department-fake.builder';
import { DepartmentSequelizeRepository } from '../../../../../department/infra/database/sequelize/department-sequelize.repository';
import { DepartmentModel } from '../../../../../department/infra/database/sequelize/department.model';
import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { Employee, EmployeeId } from '../../../../domain/employee.agregate';
import { EmployeeSequelizeRepository } from '../../../../infra/database/sequelize/employee-sequelize.repository';
import { EmployeeModel } from '../../../../infra/database/sequelize/employee.model';
import { UpdateEmployeeUseCase } from '../update-employee.use-case';

describe('UpdateEmployeeUseCase Integration Tests', () => {
  let useCase: UpdateEmployeeUseCase;
  let employeeRepo: EmployeeSequelizeRepository;
  let departmentRepo: DepartmentSequelizeRepository;
  let employee: Employee;

  setupSequelize({ models: [EmployeeModel, DepartmentModel] });

  beforeEach(() => {
    employeeRepo = new EmployeeSequelizeRepository(EmployeeModel);
    departmentRepo = new DepartmentSequelizeRepository(DepartmentModel);
    useCase = new UpdateEmployeeUseCase(employeeRepo, departmentRepo);

    const department = new DepartmentFakeBuilder().build();

    employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();
    departmentRepo.insert(department);
    employeeRepo.insert(employee);
  });

  it('should throws error when entity not found', async () => {
    const employeeId = new EmployeeId();
    await expect(() => useCase.execute({ id: employeeId.id })).rejects.toThrow(
      new NotFoundError(employeeId.id, Employee),
    );
  });

  it('should update an employee', async () => {
    const department2 = new DepartmentFakeBuilder().build();
    departmentRepo.insert(department2);

    const output = await useCase.execute({
      id: employee.employee_id.id,
      first_name: 'Updated First Name',
      last_name: 'Updated Last Name',
      department_id: department2.department_id.id,
      phone: '9875898374',
      address: 'Updated Address',
      hire_date: '2011-10-05T14:48:00.000Z',
    });
    expect(output).toStrictEqual({
      id: employee.employee_id.id,
      first_name: 'Updated First Name',
      last_name: 'Updated Last Name',
      department_id: department2.department_id.id,
      phone: '9875898374',
      address: 'Updated Address',
      created_at: employee.created_at,
      hire_date: '2011-10-05T14:48:00.000Z',
    });
  });

  it('should update first name', async () => {
    const output = await useCase.execute({
      id: employee.employee_id.id,
      first_name: 'Updated First Name',
    });

    expect(output.id).toBe(employee.employee_id.id);
    expect(output.first_name).toBe('Updated First Name');
  });

  it('should update last name', async () => {
    const output = await useCase.execute({
      id: employee.employee_id.id,
      last_name: 'Updated Last Name',
    });

    expect(output.id).toBe(employee.employee_id.id);
    expect(output.last_name).toBe('Updated Last Name');
  });

  it('should update hire date', async () => {
    const updatedHireDate = new Date('2011-10-05T14:48:00.000Z').toDateString();
    const output = await useCase.execute({
      id: employee.employee_id.id,
      hire_date: updatedHireDate,
    });

    expect(output.id).toBe(employee.employee_id.id);
    expect(output.hire_date).toBe(updatedHireDate);
  });

  it('should update department', async () => {
    const department2 = new DepartmentFakeBuilder().build();
    departmentRepo.insert(department2);
    const output = await useCase.execute({
      id: employee.employee_id.id,
      department_id: department2.department_id.id,
    });

    expect(output.id).toBe(employee.employee_id.id);
    expect(output.department_id).toBe(department2.department_id.id);
  });

  it('should update phone number', async () => {
    const output = await useCase.execute({
      id: employee.employee_id.id,
      phone: '1234567891',
    });

    expect(output.id).toBe(employee.employee_id.id);
    expect(output.phone).toBe('1234567891');
  });

  it('should update address', async () => {
    const output = await useCase.execute({
      id: employee.employee_id.id,
      address: 'Updated Address',
    });

    expect(output.id).toBe(employee.employee_id.id);
    expect(output.address).toBe('Updated Address');
  });
});

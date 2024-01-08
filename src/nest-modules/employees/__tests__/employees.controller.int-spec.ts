import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from '../employees.controller';
import { IEmployeeRepository } from '../../../core/employee/domain/employee.repository';
import { ConfigModule } from '../../config/config.module';
import { DatabaseModule } from '../../database/database.module';
import { EmployeesModule } from '../employees.module';
import { EMPLOYEE_PROVIDERS } from '../employess.providers';
import { CreateEmployeeUseCase } from '../../../core/employee/application/use-cases/create-employee/create-employee.use-case';
import { UpdateEmployeeUseCase } from '../../../core/employee/application/use-cases/update-employee/update-employee.use-case';
import { GetEmployeeUseCase } from '../../../core/employee/application/use-cases/get-employee/get-employee.use-case';
import { DeleteEmployeeUseCase } from '../../../core/employee/application/use-cases/delete-employee/delete-employee.use-case';
import {
  CreateEmployeeFixture,
  UpdateEmployeeFixture,
} from '../testing/employee-fixture';
import { EmployeeFakeBuilder } from '../../../core/employee/domain/employee-fake.builder';
import { EmployeeId } from '../../../core/employee/domain/employee.agregate';
import { IDepartmentRepository } from '../../../core/department/domain/department.repository';
import { DEPARTMENT_PROVIDERS } from '../../departments/departments.providers';
import { DepartmentFakeBuilder } from '../../../core/department/domain/department-fake.builder';

describe('EmployeesController Integration Tests', () => {
  let controller: EmployeesController;
  let employeeRepo: IEmployeeRepository;
  let departmentRepo: IDepartmentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, EmployeesModule],
    }).compile();
    controller = module.get<EmployeesController>(EmployeesController);
    employeeRepo = module.get<IEmployeeRepository>(
      EMPLOYEE_PROVIDERS.REPOSITORIES.EMPLOYEE_REPOSITORY.provide,
    );
    departmentRepo = module.get<IDepartmentRepository>(
      DEPARTMENT_PROVIDERS.REPOSITORIES.DEPARTMENT_REPOSITORY.provide,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(CreateEmployeeUseCase);
    expect(controller['updateUseCase']).toBeInstanceOf(UpdateEmployeeUseCase);
    expect(controller['getUseCase']).toBeInstanceOf(GetEmployeeUseCase);
    expect(controller['deleteUseCase']).toBeInstanceOf(DeleteEmployeeUseCase);
  });

  describe('should create an employee', () => {
    const arrange = CreateEmployeeFixture.arrangeForCreate();
    it.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected, department }) => {
        await departmentRepo.insert(department);
        const result = await controller.create(send_data);
        const entity = await employeeRepo.findById(new EmployeeId(result.id));
        expect(entity!.toJSON()).toStrictEqual({
          employee_id: result.id,
          created_at: result.created_at,
          ...expected,
        });
      },
    );
  });

  describe('should update an employee', () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();
    const arrange = UpdateEmployeeFixture.arrangeForUpdate();

    beforeEach(async () => {
      await departmentRepo.insert(department);
      await employeeRepo.insert(employee);
    });

    it.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected, department }) => {
        if (department) {
          await departmentRepo.insert(department);
        }

        const result = await controller.update(
          employee.employee_id.id,
          send_data,
        );
        const foundEmployee = await employeeRepo.findById(
          new EmployeeId(result.id),
        );
        expect(foundEmployee!.toJSON()).toStrictEqual({
          employee_id: result.id,
          created_at: result.created_at,
          first_name: expected.first_name ?? employee.first_name,
          last_name: expected.last_name ?? employee.last_name,
          hire_date: expected.hire_date ?? employee.hire_date,
          department_id: expected.department_id ?? employee.department_id.id,
          phone: expected.phone ?? employee.phone,
          address: expected.address ?? employee.address,
        });
      },
    );
  });

  it('should delete an employee', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();
    await departmentRepo.insert(department);
    await employeeRepo.insert(employee);
    const response = await controller.remove(employee.employee_id.id);
    expect(response).not.toBeDefined();
    await expect(
      employeeRepo.findById(employee.employee_id),
    ).resolves.toBeNull();
  });

  it('should get an employee', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();
    const employeeJson = employee.toJSON();
    await departmentRepo.insert(department);
    await employeeRepo.insert(employee);
    const result = await controller.findOne(employeeJson.employee_id);
    expect(result.id).toBe(employeeJson.employee_id);
    expect(result.first_name).toBe(employeeJson.first_name);
    expect(result.last_name).toBe(employeeJson.last_name);
    expect(result.hire_date).toStrictEqual(employeeJson.hire_date);
    expect(result.department_id).toBe(employeeJson.department_id);
    expect(result.phone).toBe(employeeJson.phone);
    expect(result.address).toBe(employeeJson.address);
    expect(result.created_at).toStrictEqual(employeeJson.created_at);
  });

  it('should list all employees', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();
    await departmentRepo.insert(department);
    await employeeRepo.insert(employee);
    const [output] = await controller.findAll();
    expect(output.id).toBe(employee.employee_id.id);
    expect(output.first_name).toBe(employee.first_name);
    expect(output.last_name).toBe(employee.last_name);
    expect(output.hire_date).toStrictEqual(employee.hire_date);
    expect(output.department_id).toBe(employee.department_id.id);
    expect(output.phone).toBe(employee.phone);
    expect(output.address).toBe(employee.address);
    expect(output.created_at).toStrictEqual(employee.created_at);
  });
});

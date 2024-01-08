import { DepartmentFakeBuilder } from '../../../../../department/domain/department-fake.builder';
import { DepartmentInMemoryRepository } from '../../../../../department/infra/database/in-memory/department-in-memory.repository';
import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { EmployeeInMemoryRepository } from '../../../../infra/database/in-memory/employee-in-memory.repository';
import { CreateEmployeeUseCase } from '../create-employee.use-case';

describe('CreateEmployeeUseCase Unit Tests', () => {
  let useCase: CreateEmployeeUseCase;
  let employeeRepo: EmployeeInMemoryRepository;
  let departmentRepo: DepartmentInMemoryRepository;

  beforeEach(() => {
    employeeRepo = new EmployeeInMemoryRepository();
    departmentRepo = new DepartmentInMemoryRepository();
    useCase = new CreateEmployeeUseCase(employeeRepo, departmentRepo);
  });

  it('should throw an error when aggregate is not valid', async () => {
    const department = new DepartmentFakeBuilder().build();
    await departmentRepo.insert(department);
    const input = { department_id: department.department_id.id };
    await expect(() => useCase.execute(input as any)).rejects.toThrow(
      'Entity Validation Error',
    );
  });

  it('should throw not found expection when deparatment not exists', async () => {
    const employee = new EmployeeFakeBuilder().build();

    await expect(
      useCase.execute({
        first_name: employee.first_name,
        last_name: employee.last_name,
        hire_date: employee.hire_date,
        department_id: employee.department_id.id,
        phone: employee.phone,
        address: employee.address,
      }),
    ).rejects.toThrow(
      `Department Not Found for ID: ${employee.department_id.id}`,
    );
  });

  it('should create an employee', async () => {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();

    await departmentRepo.insert(department);

    const spyInsert = jest.spyOn(employeeRepo, 'insert');

    const output = await useCase.execute({
      first_name: employee.first_name,
      last_name: employee.last_name,
      hire_date: employee.hire_date,
      department_id: employee.department_id.id,
      phone: employee.phone,
      address: employee.address,
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: employeeRepo.items[0].employee_id.id,
      created_at: employeeRepo.items[0].created_at,
      first_name: employee.first_name,
      last_name: employee.last_name,
      hire_date: employee.hire_date,
      department_id: employee.department_id.id,
      phone: employee.phone,
      address: employee.address,
    });
  });
});

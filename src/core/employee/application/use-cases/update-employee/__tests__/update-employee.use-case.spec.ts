import { DepartmentFakeBuilder } from '../../../../../department/domain/department-fake.builder';
import { DepartmentInMemoryRepository } from '../../../../../department/infra/database/in-memory/department-in-memory.repository';
import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { InvalidUuidError } from '../../../../../shared/domain/value-objects/uuid.vo';
import { EmployeeFakeBuilder } from '../../../../domain/employee-fake.builder';
import { Employee, EmployeeId } from '../../../../domain/employee.agregate';
import { EmployeeInMemoryRepository } from '../../../../infra/database/in-memory/employee-in-memory.repository';
import { UpdateEmployeeUseCase } from '../update-employee.use-case';

describe('UpdateEmployeeUseCase Unit Tests', () => {
  let useCase: UpdateEmployeeUseCase;
  let employeeRepository: EmployeeInMemoryRepository;
  let departmentRepository: DepartmentInMemoryRepository;

  beforeEach(() => {
    employeeRepository = new EmployeeInMemoryRepository();
    departmentRepository = new DepartmentInMemoryRepository();
    useCase = new UpdateEmployeeUseCase(
      employeeRepository,
      departmentRepository,
    );
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new InvalidUuidError(),
    );

    const employeeId = new EmployeeId();
    await expect(() => useCase.execute({ id: employeeId.id })).rejects.toThrow(
      new NotFoundError(employeeId.id, Employee),
    );
  });

  it('should update an employee', async () => {
    const spyUpdate = jest.spyOn(employeeRepository, 'update');
    const department1 = new DepartmentFakeBuilder().build();
    const department2 = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department1.department_id)
      .build();

    departmentRepository.items = [department1, department2];
    employeeRepository.items = [employee];

    const input = {
      id: employee.employee_id.id,
      first_name: 'Updated First Name',
      last_name: 'Updated Last Name',
      department_id: department2.department_id.id,
      phone: '9875898374',
      address: 'Updated Address',
      hire_date: '2023-10-05T14:48:00.000Z',
    };

    const output = await useCase.execute(input);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      ...input,
      created_at: employee.created_at,
    });
  });

  it('should update first name', async () => {
    const spyUpdate = jest.spyOn(employeeRepository, 'update');
    const entity = new EmployeeFakeBuilder()
      .withFirstName('First Name')
      .build();
    employeeRepository.items = [entity];

    const output = await useCase.execute({
      id: entity.employee_id.id,
      first_name: 'Updated First Name',
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output.id).toBe(entity.employee_id.id);
    expect(output.first_name).toBe('Updated First Name');
  });

  it('should update last name', async () => {
    const spyUpdate = jest.spyOn(employeeRepository, 'update');
    const entity = new EmployeeFakeBuilder().withLastName('Last Name').build();
    employeeRepository.items = [entity];

    const output = await useCase.execute({
      id: entity.employee_id.id,
      last_name: 'Updated Last Name',
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output.id).toBe(entity.employee_id.id);
    expect(output.last_name).toBe('Updated Last Name');
  });

  it('should update hire date', async () => {
    const spyUpdate = jest.spyOn(employeeRepository, 'update');
    const entity = new EmployeeFakeBuilder()
      .withHireDate(new Date('2011-10-05T14:48:00.000Z').toDateString())
      .build();
    employeeRepository.items = [entity];

    const updatedHireDate = new Date('2011-10-05T14:48:00.000Z').toDateString();
    const output = await useCase.execute({
      id: entity.employee_id.id,
      hire_date: updatedHireDate,
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output.id).toBe(entity.employee_id.id);
    expect(output.hire_date).toBe(updatedHireDate);
  });

  it('should update department', async () => {
    const spyUpdate = jest.spyOn(employeeRepository, 'update');
    const department1 = new DepartmentFakeBuilder().build();
    const department2 = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department1.department_id)
      .build();

    departmentRepository.items = [department1, department2];
    employeeRepository.items = [employee];

    const output = await useCase.execute({
      id: employee.employee_id.id,
      department_id: department2.department_id.id,
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output.id).toBe(employee.employee_id.id);
    expect(output.department_id).toBe(department2.department_id.id);
  });

  it('should update phone number', async () => {
    const spyUpdate = jest.spyOn(employeeRepository, 'update');
    const entity = new EmployeeFakeBuilder().withPhone('1234567890').build();
    employeeRepository.items = [entity];

    const output = await useCase.execute({
      id: entity.employee_id.id,
      phone: '1234567891',
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output.id).toBe(entity.employee_id.id);
    expect(output.phone).toBe('1234567891');
  });

  it('should update address', async () => {
    const spyUpdate = jest.spyOn(employeeRepository, 'update');
    const entity = new EmployeeFakeBuilder().withAddress('Address 1').build();
    employeeRepository.items = [entity];

    const output = await useCase.execute({
      id: entity.employee_id.id,
      address: 'Updated Address',
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output.id).toBe(entity.employee_id.id);
    expect(output.address).toBe('Updated Address');
  });
});

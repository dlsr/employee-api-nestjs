import { DepartmentId } from '../../../department/domain/department.aggregate';
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';
import { EmployeeFixture } from '../../testing/employee.fixture';
import { EmployeeFakeBuilder } from '../employee-fake.builder';
import {
  Employee,
  EmployeeConstructorProps,
  EmployeeId,
} from '../employee.agregate';

describe('Employee Unit Tests', () => {
  describe('employee_id field', () => {
    const arrange = [
      { employee_id: null },
      { employee_id: undefined },
      { employee_id: new EmployeeId('1db08b6d-9964-4f42-9d27-cb802163480a') },
    ];
    it.each(arrange)('when id = %j', ({ employee_id }) => {
      const employee = new Employee({
        employee_id,
      } as EmployeeConstructorProps);
      expect(employee.employee_id).toBeInstanceOf(EmployeeId);

      if (employee_id instanceof EmployeeId) {
        expect(employee.employee_id).toBe(employee_id);
      }
    });
  });

  it('should create an employee through constructor when all values are given', () => {
    const employee = new Employee({
      first_name: 'My name',
      last_name: 'Last name',
      hire_date: '2011-10-05T14:48:00.000Z',
      department_id: new DepartmentId('248de312-dfed-4e2e-a92e-2b355873bd55'),
      phone: '1234567890',
      address: 'test',
      created_at: '2011-10-05T14:48:00.000Z',
    });

    expect(employee.employee_id).toBeInstanceOf(Uuid);
    expect(employee.first_name).toBe('My name');
    expect(employee.last_name).toBe('Last name');
    expect(employee.hire_date).toBe('2011-10-05T14:48:00.000Z');
    expect(employee.department_id.id).toBe(
      '248de312-dfed-4e2e-a92e-2b355873bd55',
    );
    expect(employee.phone).toBe('1234567890');
    expect(employee.address).toBe('test');
    expect(employee.created_at).toBe('2011-10-05T14:48:00.000Z');
  });

  it('should create an employee through constructor when created_at is not given', () => {
    const employee = new Employee({
      first_name: 'My name',
      last_name: 'Last name',
      hire_date: '2011-10-05T14:48:00.000Z',
      department_id: new DepartmentId('248de312-dfed-4e2e-a92e-2b355873bd55'),
      phone: '1234567890',
      address: 'test',
    });

    expect(employee.employee_id).toBeInstanceOf(Uuid);
    expect(employee.first_name).toBe('My name');
    expect(employee.last_name).toBe('Last name');
    expect(employee.hire_date).toBe('2011-10-05T14:48:00.000Z');
    expect(employee.department_id.id).toBe(
      '248de312-dfed-4e2e-a92e-2b355873bd55',
    );
    expect(employee.phone).toBe('1234567890');
    expect(employee.address).toBe('test');
    expect(employee.created_at).toBeDefined();
  });

  it('should create an employee through create method', () => {
    const employee = Employee.create({
      first_name: 'My name',
      last_name: 'Last name',
      hire_date: '2011-10-05T14:48:00.000Z',
      department_id: new DepartmentId('248de312-dfed-4e2e-a92e-2b355873bd55'),
      phone: '1234567890',
      address: 'test',
    });

    expect(employee.employee_id).toBeInstanceOf(Uuid);
    expect(employee.first_name).toBe('My name');
    expect(employee.last_name).toBe('Last name');
    expect(employee.hire_date).toBe('2011-10-05T14:48:00.000Z');
    expect(employee.department_id.id).toBe(
      '248de312-dfed-4e2e-a92e-2b355873bd55',
    );
    expect(employee.phone).toBe('1234567890');
    expect(employee.address).toBe('test');
    expect(employee.created_at).toBeDefined();
  });

  describe('invalid first_name', () => {
    const arrange = EmployeeFixture.arrangeInvalidFirstName();
    it.each(arrange)('when first_name is $label', ({ value }) => {
      expect(value.entity.notification.hasErrors()).toBe(true);
      expect(value.entity.notification.toJSON()).toStrictEqual(value.expected);
    });
  });

  describe('invalid last_name', () => {
    const arrange = EmployeeFixture.arrangeInvalidLastName();
    it.each(arrange)('when last_name is $label', ({ value }) => {
      expect(value.entity.notification.hasErrors()).toBe(true);
      expect(value.entity.notification.toJSON()).toStrictEqual(value.expected);
    });
  });

  describe('invalid hire date', () => {
    const arrange = EmployeeFixture.arrangeInvalidHireDate();
    it.each(arrange)('when hire_date is $label', ({ value }) => {
      expect(value.entity.notification.hasErrors()).toBe(true);
      expect(value.entity.notification.toJSON()).toStrictEqual(value.expected);
    });
  });

  describe('invalid department_id', () => {
    const arrange = EmployeeFixture.arrangeInvalidDepartment();
    it.each(arrange)('when department_id is $label', ({ value }) => {
      expect(value.entity.notification.hasErrors()).toBe(true);
      expect(value.entity.notification.toJSON()).toStrictEqual(value.expected);
    });
  });

  describe('invalid phone', () => {
    const arrange = EmployeeFixture.arrangeInvalidPhone();
    it.each(arrange)('when phone is $label', ({ value }) => {
      expect(value.entity.notification.hasErrors()).toBe(true);
      expect(value.entity.notification.toJSON()).toStrictEqual(value.expected);
    });
  });

  describe('invalid address', () => {
    const arrange = EmployeeFixture.arrangeInvalidAddress();
    it.each(arrange)('when address is $label', ({ value }) => {
      expect(value.entity.notification.hasErrors()).toBe(true);
      expect(value.entity.notification.toJSON()).toStrictEqual(value.expected);
    });
  });

  it('should change first name', () => {
    const employee = new EmployeeFakeBuilder()
      .withFirstName('First Name')
      .build();
    employee.changeFirstName('Updated first name');
    expect(employee.first_name).toBe('Updated first name');
  });

  it('should change last name', () => {
    const employee = new EmployeeFakeBuilder()
      .withLastName('Last Name')
      .build();
    employee.changeLastName('Updated last name');
    expect(employee.last_name).toBe('Updated last name');
  });

  it('should change hire date', () => {
    const employee = new EmployeeFakeBuilder()
      .withHireDate('2011-10-05T14:48:00.000Z')
      .build();
    const changed_hire_date = '2023-10-05T14:48:00.000Z';
    employee.changeHireDate(changed_hire_date);
    expect(employee.hire_date).toBe(changed_hire_date);
  });

  it('should change department', () => {
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(
        new DepartmentId('248de312-dfed-4e2e-a92e-2b355873bd55'),
      )
      .build();
    employee.changeDepartment(
      new DepartmentId('c16ed068-ec4b-4705-b843-9ff2c0487cff'),
    );
    expect(employee.department_id.id).toBe(
      'c16ed068-ec4b-4705-b843-9ff2c0487cff',
    );
  });

  it('should change phone', () => {
    const employee = new EmployeeFakeBuilder().withPhone('1234567890').build();
    employee.changePhone('1234567891');
    expect(employee.phone).toBe('1234567891');
  });

  it('should change address', () => {
    const employee = new EmployeeFakeBuilder().withAddress('address').build();
    employee.changeAddress('changed address');
    expect(employee.address).toBe('changed address');
  });
});

import { DepartmentId } from '../../department/domain/department.aggregate';
import { AggregateRoot } from '../../shared/domain/aggregate-root';
import { ValueObject } from '../../shared/domain/value-object';
import { Uuid } from '../../shared/domain/value-objects/uuid.vo';
import { EmployeeValidatorFactory } from './employee.validator';

export class EmployeeId extends Uuid {}

export class Employee extends AggregateRoot {
  employee_id: EmployeeId;
  first_name: string;
  last_name: string;
  hire_date: string;
  department_id: DepartmentId;
  phone: string;
  address: string;
  created_at: string;

  constructor(props: EmployeeConstructorProps) {
    super();
    this.employee_id = props.employee_id ?? new EmployeeId();
    this.first_name = props.first_name;
    this.last_name = props.last_name;
    this.hire_date = props.hire_date;
    this.department_id = props.department_id;
    this.phone = props.phone;
    this.address = props.address;
    this.created_at = props.created_at ?? new Date().toISOString();
  }

  get entity_id(): ValueObject {
    return this.employee_id;
  }

  static create(props: EmployeeCreateCommand): Employee {
    const employee = new Employee(props);
    employee.validate();
    return employee;
  }

  changeFirstName(fisrt_name: string): void {
    this.first_name = fisrt_name;
    this.validate();
  }

  changeLastName(last_name: string): void {
    this.last_name = last_name;
    this.validate();
  }

  changeHireDate(hire_date: string): void {
    this.hire_date = hire_date;
    this.validate();
  }

  changeDepartment(department_id: DepartmentId): void {
    this.department_id = department_id;
    this.validate();
  }

  changePhone(phone: string): void {
    this.phone = phone;
    this.validate();
  }

  changeAddress(address: string): void {
    this.address = address;
    this.validate();
  }

  validate() {
    const validator = EmployeeValidatorFactory.create();
    return validator.validate(this.notification, this);
  }

  toJSON() {
    return {
      employee_id: this.employee_id.id,
      first_name: this.first_name,
      last_name: this.last_name,
      hire_date: this.hire_date,
      department_id: this.department_id.id,
      phone: this.phone,
      address: this.address,
      created_at: this.created_at,
    };
  }
}

export type EmployeeConstructorProps = {
  employee_id?: EmployeeId;
  first_name: string;
  last_name: string;
  hire_date: string;
  department_id: DepartmentId;
  phone: string;
  address: string;
  created_at?: string;
};

export type EmployeeCreateCommand = {
  first_name: string;
  last_name: string;
  hire_date: string;
  department_id: DepartmentId;
  phone: string;
  address: string;
};

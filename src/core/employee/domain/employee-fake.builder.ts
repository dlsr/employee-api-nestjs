import { DepartmentId } from '../../department/domain/department.aggregate';
import { Employee } from './employee.agregate';

export class EmployeeFakeBuilder {
  private first_name: string = 'First Name';
  private last_name: string = 'Last Name';
  private hire_date: string = '2011-10-05T14:48:00.000Z';
  private department_id: DepartmentId = new DepartmentId();
  private phone: string = '9999999999';
  private address: string = 'Street Maria Amleia 32';

  withFirstName(value: string) {
    this.first_name = value;
    return this;
  }

  withLastName(value: string) {
    this.last_name = value;
    return this;
  }

  withHireDate(value: string) {
    this.hire_date = value;
    return this;
  }

  withDepartmentId(value: DepartmentId) {
    this.department_id = value;
    return this;
  }

  withPhone(value: string) {
    this.phone = value;
    return this;
  }

  withAddress(value: string) {
    this.address = value;
    return this;
  }

  build(): Employee {
    return Employee.create({
      first_name: this.first_name,
      last_name: this.last_name,
      hire_date: this.hire_date,
      department_id: this.department_id,
      phone: this.phone,
      address: this.address,
    });
  }
}

import { DepartmentFakeBuilder } from '../../../core/department/domain/department-fake.builder';
import { EmployeeFakeBuilder } from '../../../core/employee/domain/employee-fake.builder';

export class CreateEmployeeFixture {
  static arrangeForCreate() {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();

    return [
      {
        department,
        send_data: {
          first_name: employee.first_name,
          last_name: employee.last_name,
          hire_date: employee.hire_date,
          department_id: employee.department_id.id,
          phone: employee.phone,
          address: employee.address,
        },
        expected: {
          first_name: employee.first_name,
          last_name: employee.last_name,
          hire_date: employee.hire_date,
          department_id: employee.department_id.id,
          phone: employee.phone,
          address: employee.address,
        },
      },
    ];
  }

  static arrangeInvalidRequest() {
    const defaultExpected = {
      statusCode: 422,
      error: 'Unprocessable Entity',
    };

    return {
      EMPTY: {
        send_data: {},
        expected: {
          message: [
            'first_name should not be empty',
            'first_name must be a string',
            'last_name should not be empty',
            'last_name must be a string',
            'hire_date should not be empty',
            'hire_date must be a valid ISO 8601 date string',
            'department_id should not be empty',
            'department_id must be a UUID',
            'phone should not be empty',
            'phone must be a string',
            'address should not be empty',
            'address must be a string',
          ],
          ...defaultExpected,
        },
      },
    };
  }
}

export class UpdateEmployeeFixture {
  static arrangeForUpdate() {
    const department = new DepartmentFakeBuilder().build();
    const employee = new EmployeeFakeBuilder()
      .withDepartmentId(department.department_id)
      .build();

    return [
      {
        department,
        send_data: {
          first_name: employee.first_name,
        },
        expected: {
          first_name: employee.first_name,
        },
      },
      {
        department,
        send_data: {
          last_name: employee.last_name,
        },
        expected: {
          last_name: employee.last_name,
        },
      },
      {
        department,
        send_data: {
          hire_date: employee.hire_date,
        },
        expected: {
          hire_date: employee.hire_date,
        },
      },
      {
        department,
        send_data: {
          department_id: employee.department_id.id,
        },
        expected: {
          department_id: employee.department_id.id,
        },
      },
      {
        department,
        send_data: {
          phone: employee.phone,
        },
        expected: {
          phone: employee.phone,
        },
      },
      {
        department,
        send_data: {
          address: employee.address,
        },
        expected: {
          address: employee.address,
        },
      },
    ];
  }

  static arrangeInvalidRequest() {
    const defaultExpected = {
      statusCode: 422,
      error: 'Unprocessable Entity',
    };

    return {
      FIRST_NAME_NOT_A_STRING: {
        send_data: {
          first_name: 5,
        },
        expected: {
          message: ['first_name must be a string'],
          ...defaultExpected,
        },
      },
      HIRE_DATE_NOT_A_VALID_DATE: {
        send_data: {
          hire_date: 12312332,
        },
        expected: {
          message: ['hire_date must be a valid ISO 8601 date string'],
          ...defaultExpected,
        },
      },
    };
  }
}

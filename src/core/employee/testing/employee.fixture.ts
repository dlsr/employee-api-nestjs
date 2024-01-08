import { EmployeeFakeBuilder } from '../../../core/employee/domain/employee-fake.builder';
import { DepartmentId } from '../../department/domain/department.aggregate';

export class EmployeeFixture {
  static arrangeForCreate() {
    const faker = new EmployeeFakeBuilder()
      .withFirstName('First name')
      .withLastName('Last name')
      .withHireDate('2011-10-05T14:48:00.000Z')
      .withDepartmentId(new DepartmentId())
      .withPhone('1234567890')
      .withAddress('Street St Peters Pool')
      .build();

    return [
      {
        send_data: {
          first_name: faker.first_name,
          last_name: faker.last_name,
          hire_date: faker.hire_date,
          department_id: faker.department_id,
          phone: faker.phone,
          address: faker.address,
        },
        expected: {
          first_name: faker.first_name,
          last_name: faker.last_name,
          hire_date: faker.hire_date,
          department_id: faker.department_id,
          phone: faker.phone,
          address: faker.address,
        },
      },
    ];
  }

  static arrangeInvalidFirstName() {
    const arrange = {
      EMPTY: {
        entity: new EmployeeFakeBuilder().withFirstName('').build(),
        expected: [
          {
            first_name: [
              'first_name should not be empty',
              'first_name must be longer than or equal to 3 characters',
            ],
          },
        ],
      },
      UNDEFINED: {
        entity: new EmployeeFakeBuilder().withFirstName(undefined!).build(),
        expected: [
          {
            first_name: [
              'first_name should not be empty',
              'first_name must be a string',
              'first_name must be longer than or equal to 3 characters',
              'first_name must be shorter than or equal to 255 characters',
            ],
          },
        ],
      },
      FIRST_NAME_TOO_SHORT: {
        entity: new EmployeeFakeBuilder().withFirstName('aa').build(),
        expected: [
          {
            first_name: [
              'first_name must be longer than or equal to 3 characters',
            ],
          },
        ],
      },
      FIRST_NAME_TOO_LONG: {
        entity: new EmployeeFakeBuilder()
          .withFirstName('a'.repeat(256))
          .build(),
        expected: [
          {
            first_name: [
              'first_name must be shorter than or equal to 255 characters',
            ],
          },
        ],
      },
    };

    return Object.keys(arrange).map((key) => ({
      label: key,
      value: arrange[key],
    }));
  }

  static arrangeInvalidLastName() {
    const arrange = {
      EMPTY: {
        entity: new EmployeeFakeBuilder().withLastName('').build(),
        expected: [
          {
            last_name: [
              'last_name should not be empty',
              'last_name must be longer than or equal to 3 characters',
            ],
          },
        ],
      },
      UNDEFINED: {
        entity: new EmployeeFakeBuilder().withLastName(undefined!).build(),
        expected: [
          {
            last_name: [
              'last_name should not be empty',
              'last_name must be a string',
              'last_name must be longer than or equal to 3 characters',
              'last_name must be shorter than or equal to 255 characters',
            ],
          },
        ],
      },
      TOO_SHORT: {
        entity: new EmployeeFakeBuilder().withLastName('aa').build(),
        expected: [
          {
            last_name: [
              'last_name must be longer than or equal to 3 characters',
            ],
          },
        ],
      },
      TOO_LONG: {
        entity: new EmployeeFakeBuilder().withLastName('a'.repeat(256)).build(),
        expected: [
          {
            last_name: [
              'last_name must be shorter than or equal to 255 characters',
            ],
          },
        ],
      },
    };

    return Object.keys(arrange).map((key) => ({
      label: key,
      value: arrange[key],
    }));
  }

  static arrangeInvalidHireDate() {
    const arrange = {
      EMPTY: {
        entity: new EmployeeFakeBuilder().withHireDate(undefined!).build(),
        expected: [
          {
            hire_date: [
              'hire_date should not be empty',
              'hire_date must be a valid ISO 8601 date string',
            ],
          },
        ],
      },
      NOT_VALID_DATE_STRING: {
        entity: new EmployeeFakeBuilder().withHireDate('123').build(),
        expected: [
          {
            hire_date: ['hire_date must be a valid ISO 8601 date string'],
          },
        ],
      },
    };

    return Object.keys(arrange).map((key) => ({
      label: key,
      value: arrange[key],
    }));
  }

  static arrangeInvalidDepartment() {
    const arrange = {
      UNDEFINED: {
        entity: new EmployeeFakeBuilder().withDepartmentId(undefined!).build(),
        expected: [
          {
            department_id: ['department_id should not be empty'],
          },
        ],
      },
    };

    return Object.keys(arrange).map((key) => ({
      label: key,
      value: arrange[key],
    }));
  }

  static arrangeInvalidPhone() {
    const arrange = {
      UNDEFINED: {
        entity: new EmployeeFakeBuilder().withPhone(undefined!).build(),
        expected: [
          {
            phone: [
              'phone should not be empty',
              'phone must be a string',
              'phone must be longer than or equal to 10 characters',
            ],
          },
        ],
      },
      EMPTY: {
        entity: new EmployeeFakeBuilder().withPhone('').build(),
        expected: [
          {
            phone: [
              'phone should not be empty',
              'phone must be longer than or equal to 10 characters',
            ],
          },
        ],
      },
      TOO_SHORT: {
        entity: new EmployeeFakeBuilder().withPhone('9'.repeat(9)).build(),
        expected: [
          {
            phone: ['phone must be longer than or equal to 10 characters'],
          },
        ],
      },
      TOO_LONG: {
        entity: new EmployeeFakeBuilder().withPhone('9'.repeat(11)).build(),
        expected: [
          {
            phone: ['phone must be shorter than or equal to 10 characters'],
          },
        ],
      },
    };

    return Object.keys(arrange).map((key) => ({
      label: key,
      value: arrange[key],
    }));
  }

  static arrangeInvalidAddress() {
    const arrange = {
      UNDEFINED: {
        entity: new EmployeeFakeBuilder().withAddress(undefined!).build(),
        expected: [
          {
            address: [
              'address should not be empty',
              'address must be a string',
              'address must be longer than or equal to 10 characters',
              'address must be shorter than or equal to 255 characters',
            ],
          },
        ],
      },
      EMPTY: {
        entity: new EmployeeFakeBuilder().withAddress('').build(),
        expected: [
          {
            address: [
              'address should not be empty',
              'address must be longer than or equal to 10 characters',
            ],
          },
        ],
      },
      TOO_SHORT: {
        entity: new EmployeeFakeBuilder().withAddress('a'.repeat(9)).build(),
        expected: [
          {
            address: ['address must be longer than or equal to 10 characters'],
          },
        ],
      },
      TOO_LONG: {
        entity: new EmployeeFakeBuilder().withAddress('a'.repeat(256)).build(),
        expected: [
          {
            address: [
              'address must be shorter than or equal to 255 characters',
            ],
          },
        ],
      },
    };

    return Object.keys(arrange).map((key) => ({
      label: key,
      value: arrange[key],
    }));
  }
}

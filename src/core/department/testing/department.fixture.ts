import { DepartmentFakeBuilder } from '../domain/department-fake.builder';

export class DepartmentFixture {
  static arrangeForCreate() {
    const faker = new DepartmentFakeBuilder().withName('Dep name').build();

    return [
      {
        send_data: {
          name: faker.name,
        },
        expected: {
          name: faker.name,
        },
      },
    ];
  }

  static arrangeInvalidName() {
    const arrange = {
      EMPTY: {
        entity: new DepartmentFakeBuilder().withName('').build(),
        expected: [
          {
            name: [
              'name should not be empty',
              'name must be longer than or equal to 3 characters',
            ],
          },
        ],
      },
      UNDEFINED: {
        entity: new DepartmentFakeBuilder().withName(undefined!).build(),
        expected: [
          {
            name: [
              'name should not be empty',
              'name must be a string',
              'name must be longer than or equal to 3 characters',
              'name must be shorter than or equal to 255 characters',
            ],
          },
        ],
      },
      FIRST_NAME_TOO_SHORT: {
        entity: new DepartmentFakeBuilder().withName('aa').build(),
        expected: [
          {
            name: ['name must be longer than or equal to 3 characters'],
          },
        ],
      },
      FIRST_NAME_TOO_LONG: {
        entity: new DepartmentFakeBuilder().withName('a'.repeat(256)).build(),
        expected: [
          {
            name: ['name must be shorter than or equal to 255 characters'],
          },
        ],
      },
    };

    return Object.keys(arrange).map((key) => ({
      label: key,
      value: arrange[key],
    }));
  }

  static arrangeForEntityValidationError() {
    const defaultExpected = {
      statusCode: 422,
      error: 'Unprocessable Entity',
    };

    return {
      NAME_TOO_SHORT: {
        send_data: {
          name: 'a',
        },
        expected: {
          message: ['name must be shorter than or equal to 255 characters'],
          ...defaultExpected,
        },
      },
      NAME_TOO_LONG: {
        send_data: {
          name: 'a'.repeat(256),
        },
        expected: {
          message: ['name must be shorter than or equal to 255 characters'],
          ...defaultExpected,
        },
      },
    };
  }
}

import { DepartmentFakeBuilder } from '../../../core/department/domain/department-fake.builder';

export class CreateDepartmentE2EFixture {
  static arrangeForCreate() {
    const department = new DepartmentFakeBuilder()
      .withName('Department name')
      .build();
    return [
      {
        send_data: {
          name: department.name,
        },
        expected: {
          name: department.name,
        },
      },
    ];
  }

  static arrangeInvalidRequest() {
    const defaultExpected = {
      statusCode: 422,
      error: 'Unprocessable Entity',
    };

    const testCases = {
      EMPTY: {
        send_data: {},
        expected: {
          message: ['name should not be empty', 'name must be a string'],
          ...defaultExpected,
        },
      },
      NAME_UNDEFINED: {
        send_data: {
          name: undefined,
        },
        expected: {
          message: ['name should not be empty', 'name must be a string'],
          ...defaultExpected,
        },
      },
      NAME_NULL: {
        send_data: {
          name: null,
        },
        expected: {
          message: ['name should not be empty', 'name must be a string'],
          ...defaultExpected,
        },
      },
      NAME_EMPTY: {
        send_data: {
          name: '',
        },
        expected: {
          message: ['name should not be empty'],
          ...defaultExpected,
        },
      },
    };

    return Object.keys(testCases).map((key) => ({
      label: key,
      value: testCases[key],
    }));
  }
}

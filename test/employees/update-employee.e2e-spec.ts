import request from 'supertest';
import { startApp } from '../helper/start-app';
import { EmployeeFakeBuilder } from '../../src/core/employee/domain/employee-fake.builder';
import { UpdateEmployeeFixture } from '../../src/nest-modules/employees/testing/employee-fixture';
import { IEmployeeRepository } from '../../src/core/employee/domain/employee.repository';
import { EMPLOYEE_PROVIDERS } from '../../src/nest-modules/employees/employess.providers';
import { EmployeeId } from '../../src/core/employee/domain/employee.agregate';
import { IDepartmentRepository } from '../../src/core/department/domain/department.repository';
import { DEPARTMENT_PROVIDERS } from '../../src/nest-modules/departments/departments.providers';

describe('EmployeesController (e2e)', () => {
  const uuid = '9366b7dc-2d71-4799-b91c-c64adb205104';

  describe('/employees/:id (PATCH)', () => {
    describe('should a response error when id is invalid or not found', () => {
      const appHelper = startApp();
      const faker = new EmployeeFakeBuilder().build();
      const arrange = [
        {
          id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          send_data: { first_name: faker.first_name },
          expected: {
            message:
              'Employee Not Found for ID: 88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
            statusCode: 404,
            error: 'Not Found',
          },
        },
        {
          id: 'fake id',
          send_data: { first_name: faker.first_name },
          expected: {
            statusCode: 422,
            message: 'Validation failed (uuid is expected)',
            error: 'Unprocessable Entity',
          },
        },
      ];

      test.each(arrange)(
        'when id is $id',
        async ({ id, send_data, expected }) => {
          return request(appHelper.app.getHttpServer())
            .patch(`/employees/${id}`)
            .send(send_data)
            .expect(expected.statusCode)
            .expect(expected);
        },
      );
    });

    describe('should a response error with 422 when request body is invalid', () => {
      const app = startApp();
      const invalidRequest = UpdateEmployeeFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
      test.each(arrange)('when body is $label', ({ value }) => {
        return request(app.app.getHttpServer())
          .patch(`/employees/${uuid}`)
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should update an employee', () => {
      const appHelper = startApp();
      const arrange = UpdateEmployeeFixture.arrangeForUpdate();
      let employeeRepo: IEmployeeRepository;
      let departmentRepo: IDepartmentRepository;
      beforeEach(async () => {
        employeeRepo = appHelper.app.get<IEmployeeRepository>(
          EMPLOYEE_PROVIDERS.REPOSITORIES.EMPLOYEE_REPOSITORY.provide,
        );

        departmentRepo = appHelper.app.get<IDepartmentRepository>(
          DEPARTMENT_PROVIDERS.REPOSITORIES.DEPARTMENT_REPOSITORY.provide,
        );
      });
      test.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected, department }) => {
          const employee = new EmployeeFakeBuilder()
            .withDepartmentId(department.department_id)
            .build();
          await departmentRepo.insert(department);
          await employeeRepo.insert(employee);

          const res = await request(appHelper.app.getHttpServer())
            .patch(`/employees/${employee.employee_id.id}`)
            .send(send_data)
            .expect(200);

          const id = res.body.id;
          const employeeUpdated = await employeeRepo.findById(
            new EmployeeId(id),
          );
          expect(res.body).toStrictEqual({
            id: employeeUpdated?.employee_id.id,
            created_at: employeeUpdated?.created_at,
            first_name: expected.first_name ?? employeeUpdated!.first_name,
            last_name: expected.last_name ?? employeeUpdated!.last_name,
            hire_date: expected.hire_date ?? employeeUpdated!.hire_date,
            department_id:
              expected.department_id ?? employeeUpdated!.department_id.id,
            phone: expected.phone ?? employeeUpdated!.phone,
            address: expected.address ?? employeeUpdated!.address,
          });
        },
      );
    });
  });
});

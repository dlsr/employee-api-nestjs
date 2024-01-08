import request from 'supertest';
import { CreateEmployeeFixture } from '../../src/nest-modules/employees/testing/employee-fixture';
import { IEmployeeRepository } from '../../src/core/employee/domain/employee.repository';
import { EMPLOYEE_PROVIDERS } from '../../src/nest-modules/employees/employess.providers';
import { startApp } from '../helper/start-app';
import { EmployeeId } from '../../src/core/employee/domain/employee.agregate';
import { IDepartmentRepository } from '../../src/core/department/domain/department.repository';
import { DEPARTMENT_PROVIDERS } from '../../src/nest-modules/departments/departments.providers';

describe('EmployeeController (e2e)', () => {
  const appHelper = startApp();
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

  describe('/employees (POST)', () => {
    describe('should return a response error with 422 status code when request body is invalid', () => {
      const invalidRequest = CreateEmployeeFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
      it.each(arrange)('when body is $label', ({ value }) => {
        return request(appHelper.app.getHttpServer())
          .post('/employees')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should create an employee', () => {
      const arrange = CreateEmployeeFixture.arrangeForCreate();
      it.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected, department }) => {
          await departmentRepo.insert(department);
          const res = await request(appHelper.app.getHttpServer())
            .post('/employees')
            .send(send_data)
            .expect(201);
          const id = res.body?.id;
          const employeeCreated = await employeeRepo.findById(
            new EmployeeId(id),
          );
          expect(res.body).toStrictEqual({
            id: employeeCreated?.employee_id.id,
            created_at: employeeCreated?.created_at,
            ...expected,
          });
        },
      );
    });
  });
});

import request from 'supertest';
import { startApp } from '../helper/start-app';
import { IEmployeeRepository } from '../../src/core/employee/domain/employee.repository';
import { EMPLOYEE_PROVIDERS } from '../../src/nest-modules/employees/employess.providers';
import { EmployeeFakeBuilder } from '../../src/core/employee/domain/employee-fake.builder';
import { IDepartmentRepository } from '../../src/core/department/domain/department.repository';
import { DEPARTMENT_PROVIDERS } from '../../src/nest-modules/departments/departments.providers';
import { DepartmentFakeBuilder } from '../../src/core/department/domain/department-fake.builder';

describe('EmployeeController (e2e)', () => {
  const appHelper = startApp();
  describe('/employees/:id (GET)', () => {
    describe('should a response error when id is invalid or not found', () => {
      const arrange = [
        {
          id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          expected: {
            message:
              'Employee Not Found for ID: 88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
            statusCode: 404,
            error: 'Not Found',
          },
        },
        {
          id: 'fake id',
          expected: {
            statusCode: 422,
            message: 'Validation failed (uuid is expected)',
            error: 'Unprocessable Entity',
          },
        },
      ];

      test.each(arrange)('when id is $id', async ({ id, expected }) => {
        return request(appHelper.app.getHttpServer())
          .get(`/employees/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should return an employee ', async () => {
      const employeeRepo = appHelper.app.get<IEmployeeRepository>(
        EMPLOYEE_PROVIDERS.REPOSITORIES.EMPLOYEE_REPOSITORY.provide,
      );
      const departmentRepo = appHelper.app.get<IDepartmentRepository>(
        DEPARTMENT_PROVIDERS.REPOSITORIES.DEPARTMENT_REPOSITORY.provide,
      );

      const department = new DepartmentFakeBuilder().build();
      const employee = new EmployeeFakeBuilder()
        .withDepartmentId(department.department_id)
        .build();
      await departmentRepo.insert(department);
      await employeeRepo.insert(employee);

      const res = await request(appHelper.app.getHttpServer())
        .get(`/employees/${employee.employee_id.id}`)
        .expect(200);

      expect(res.body).toStrictEqual({
        id: employee!.employee_id.id,
        created_at: employee!.created_at,
        first_name: employee!.first_name,
        last_name: employee!.last_name,
        hire_date: employee!.hire_date,
        department_id: employee!.department_id.id,
        phone: employee!.phone,
        address: employee!.address,
      });
    });
  });
});

import request from 'supertest';
import { startApp } from '../helper/start-app';
import { IEmployeeRepository } from '../../src/core/employee/domain/employee.repository';
import { EMPLOYEE_PROVIDERS } from '../../src/nest-modules/employees/employess.providers';
import { EmployeeFakeBuilder } from '../../src/core/employee/domain/employee-fake.builder';
import { DepartmentFakeBuilder } from '../../src/core/department/domain/department-fake.builder';
import { DEPARTMENT_PROVIDERS } from '../../src/nest-modules/departments/departments.providers';
import { IDepartmentRepository } from '../../src/core/department/domain/department.repository';

describe('EmployeeController (e2e)', () => {
  const appHelper = startApp();
  describe('/employees', () => {
    it('should a response an empty array', async () => {
      return request(appHelper.app.getHttpServer())
        .get(`/employees`)
        .expect(200)
        .expect([]);
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
        .get(`/employees`)
        .expect(200);

      expect(res.body).toStrictEqual([
        {
          id: employee!.employee_id.id,
          created_at: employee.created_at,
          first_name: employee!.first_name,
          last_name: employee!.last_name,
          hire_date: employee!.hire_date,
          department_id: employee!.department_id.id,
          phone: employee!.phone,
          address: employee!.address,
        },
      ]);
    });
  });
});

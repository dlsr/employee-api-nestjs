import request from 'supertest';
import { startApp } from '../helper/start-app';
import { DEPARTMENT_PROVIDERS } from '../../src/nest-modules/departments/departments.providers';
import { IDepartmentRepository } from '../../src/core/department/domain/department.repository';
import { DepartmentFakeBuilder } from '../../src/core/department/domain/department-fake.builder';

describe('DepartmentController (e2e)', () => {
  const nestApp = startApp();
  describe('/departments', () => {
    it('should a response an empty array', async () => {
      return request(nestApp.app.getHttpServer())
        .get(`/departments`)
        .expect(200)
        .expect([]);
    });

    it('should return a list of departments ', async () => {
      const repo = nestApp.app.get<IDepartmentRepository>(
        DEPARTMENT_PROVIDERS.REPOSITORIES.DEPARTMENT_REPOSITORY.provide,
      );
      const department = new DepartmentFakeBuilder().build();
      await repo.insert(department);

      const res = await request(nestApp.app.getHttpServer())
        .get(`/departments`)
        .expect(200);

      expect(res.body).toStrictEqual([
        {
          id: department!.department_id.id,
          created_at: department.created_at,
          name: department!.name,
        },
      ]);
    });
  });
});

import request from 'supertest';
import { startApp } from '../helper/start-app';
import { IDepartmentRepository } from '../../src/core/department/domain/department.repository';
import { DEPARTMENT_PROVIDERS } from '../../src/nest-modules/departments/departments.providers';
import { CreateDepartmentE2EFixture } from '../../src/nest-modules/departments/testing/department-fixture.e2e';
import { DepartmentId } from '../../src/core/department/domain/department.aggregate';

describe('DepartmentController (e2e)', () => {
  const appHelper = startApp();
  let repo: IDepartmentRepository;

  beforeEach(async () => {
    repo = appHelper.app.get<IDepartmentRepository>(
      DEPARTMENT_PROVIDERS.REPOSITORIES.DEPARTMENT_REPOSITORY.provide,
    );
  });

  describe('/departments (POST)', () => {
    describe('should return a response error with 422 status code when request body is invalid', () => {
      const arrange = CreateDepartmentE2EFixture.arrangeInvalidRequest();
      it.each(arrange)('when body is $label', ({ value }) => {
        return request(appHelper.app.getHttpServer())
          .post('/departments')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should create a department', () => {
      const arrange = CreateDepartmentE2EFixture.arrangeForCreate();
      it.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected }) => {
          const res = await request(appHelper.app.getHttpServer())
            .post('/departments')
            .send(send_data)
            .expect(201);
          const id = res.body?.id;
          const department = await repo.findById(new DepartmentId(id));
          expect(res.body).toStrictEqual({
            id: department?.department_id.id,
            created_at: department?.created_at,
            ...expected,
          });
        },
      );
    });
  });
});

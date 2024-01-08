import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DepartmentModel } from '../../core/department/infra/database/sequelize/department.model';
import { DepartmentsController } from './departments.controller';
import { DEPARTMENT_PROVIDERS } from './departments.providers';

@Module({
  imports: [SequelizeModule.forFeature([DepartmentModel])],
  controllers: [DepartmentsController],
  providers: [
    ...Object.values(DEPARTMENT_PROVIDERS.REPOSITORIES),
    ...Object.values(DEPARTMENT_PROVIDERS.USE_CASES),
  ],
  exports: [DEPARTMENT_PROVIDERS.REPOSITORIES.DEPARTMENT_REPOSITORY.provide],
})
export class DepartmentsModule {}

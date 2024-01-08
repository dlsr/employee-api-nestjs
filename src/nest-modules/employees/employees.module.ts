import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModel } from '../../core/employee/infra/database/sequelize/employee.model';
import { EMPLOYEE_PROVIDERS } from './employess.providers';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [SequelizeModule.forFeature([EmployeeModel]), DepartmentsModule],
  controllers: [EmployeesController],
  providers: [
    ...Object.values(EMPLOYEE_PROVIDERS.REPOSITORIES),
    ...Object.values(EMPLOYEE_PROVIDERS.USE_CASES),
  ],
})
export class EmployeesModule {}

import { Module } from '@nestjs/common';
import { EmployeesModule } from './nest-modules/employees/employees.module';
import { DatabaseModule } from './nest-modules/database/database.module';
import { ConfigModule } from './nest-modules/config/config.module';
import { DepartmentsModule } from './nest-modules/departments/departments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    EmployeesModule,
    DepartmentsModule,
  ],
})
export class AppModule {}

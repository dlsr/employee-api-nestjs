import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModel } from '../../core/employee/infra/database/sequelize/employee.model';
import { ConfigService } from '@nestjs/config';
import { DepartmentModel } from '../../core/department/infra/database/sequelize/department.model';

const models = [EmployeeModel, DepartmentModel];

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const dbVendor = configService.get('DB_VENDOR');
        if (configService.get('DB_VENDOR') === 'sqlite') {
          return {
            dialect: 'sqlite',
            host: configService.get('DB_HOST'),
            models,
            logging: !!configService.get('DB_LOGGING'),
            autoLoadModels: !!configService.get('DB_AUTO_LOAD_MODELS'),
          };
        }

        if (dbVendor === 'mysql') {
          return {
            dialect: 'mysql',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            database: configService.get('DB_DATABASE'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            models,
            logging: !!configService.get('DB_LOGGING'),
            autoLoadModels: !!configService.get('DB_AUTO_LOAD_MODELS'),
          };
        }

        throw new Error(`Unsupported database config: ${dbVendor}`);
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

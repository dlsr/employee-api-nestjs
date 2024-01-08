import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Employee } from './employee.agregate';
import { NotificationErros } from '../../shared/domain/validators/notification';
import { ClassValidatorFields } from '../../shared/domain/validators/class-validator-fields';
import { DepartmentId } from '../../department/domain/department.aggregate';

export class EmployeeRules {
  @MaxLength(255)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @MaxLength(255)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsDateString()
  @IsNotEmpty()
  hire_date: Date;

  @IsNotEmpty()
  department_id: DepartmentId;

  @Length(10, 10)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @MaxLength(255)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  address: string;

  constructor({
    first_name,
    last_name,
    hire_date,
    department_id,
    phone,
    address,
  }: Employee) {
    Object.assign(this, {
      first_name,
      last_name,
      hire_date,
      department_id,
      phone,
      address,
    });
  }
}

export class EmployeeValidator extends ClassValidatorFields {
  validate(notification: NotificationErros, entity: Employee): boolean {
    return super.validate(notification, new EmployeeRules(entity));
  }
}

export class EmployeeValidatorFactory {
  static create() {
    return new EmployeeValidator();
  }
}

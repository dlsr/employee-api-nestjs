import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Department } from './department.aggregate';
import { NotificationErros } from '../../shared/domain/validators/notification';
import { ClassValidatorFields } from '../../shared/domain/validators/class-validator-fields';

export class DepartmentRules {
  @MaxLength(255)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor({ name }: Department) {
    Object.assign(this, {
      name,
    });
  }
}

export class DepartmentValidator extends ClassValidatorFields {
  validate(notification: NotificationErros, entity: Department): boolean {
    return super.validate(notification, new DepartmentRules(entity));
  }
}

export class DepartmentValidatorFactory {
  static create() {
    return new DepartmentValidator();
  }
}

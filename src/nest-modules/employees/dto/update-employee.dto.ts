import { OmitType } from '@nestjs/mapped-types';
import { UpdateEmployeeInput } from '../../../core/employee/application/use-cases/update-employee/update-employee.input';

export class UpdateEmployeeInputWithoutId extends OmitType(
  UpdateEmployeeInput,
  ['id'] as const,
) {}

export class UpdateEmployeeDto extends UpdateEmployeeInputWithoutId {}

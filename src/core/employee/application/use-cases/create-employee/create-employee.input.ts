import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEmployeeInput {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsDateString()
  @IsNotEmpty()
  hire_date: string;

  @IsUUID()
  @IsNotEmpty()
  department_id: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

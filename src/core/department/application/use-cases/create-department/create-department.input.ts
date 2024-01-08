import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmentInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}

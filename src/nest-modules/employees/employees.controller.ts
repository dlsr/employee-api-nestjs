import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import {
  CreateEmployeeOutput,
  CreateEmployeeUseCase,
} from '../../core/employee/application/use-cases/create-employee/create-employee.use-case';
import { UpdateEmployeeUseCase } from '../../core/employee/application/use-cases/update-employee/update-employee.use-case';
import { DeleteEmployeeUseCase } from '../../core/employee/application/use-cases/delete-employee/delete-employee.use-case';
import { GetEmployeeUseCase } from '../../core/employee/application/use-cases/get-employee/get-employee.use-case';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ListEmployeesUseCase } from '../../core/employee/application/use-cases/list-employees/list-employees.use-case';

@Controller('employees')
export class EmployeesController {
  @Inject(CreateEmployeeUseCase)
  private createUseCase: CreateEmployeeUseCase;

  @Inject(UpdateEmployeeUseCase)
  private updateUseCase: UpdateEmployeeUseCase;

  @Inject(DeleteEmployeeUseCase)
  private deleteUseCase: DeleteEmployeeUseCase;

  @Inject(GetEmployeeUseCase)
  private getUseCase: GetEmployeeUseCase;

  @Inject(ListEmployeesUseCase)
  private listUseCase: ListEmployeesUseCase;

  @Post()
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<CreateEmployeeOutput> {
    return this.createUseCase.execute(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.listUseCase.execute();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.getUseCase.execute({ id });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.updateUseCase.execute({ ...updateEmployeeDto, id });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ): Promise<void> {
    return this.deleteUseCase.execute({ id });
  }
}

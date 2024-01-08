import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { CreateDepartmentUseCase } from '../../core/department/application/use-cases/create-department/create-department.use-case';
import { ListDepartmentsUseCase } from '../../core/department/application/use-cases/list-departments/list-departments.use-case';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentOutput } from '../../core/department/application/use-cases/common/department-output';

@Controller('departments')
export class DepartmentsController {
  @Inject(CreateDepartmentUseCase)
  private createUseCase: CreateDepartmentUseCase;

  @Inject(ListDepartmentsUseCase)
  private listUseCase: ListDepartmentsUseCase;

  @Post()
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentOutput> {
    return this.createUseCase.execute(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.listUseCase.execute();
  }
}

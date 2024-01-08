import { CreateDepartmentOutput } from '../../../core/department/application/use-cases/create-department/create-department.use-case';
import { ListDepartmentsOutput } from '../../../core/department/application/use-cases/list-departments/list-departments.use-case';
import { DepartmentsController } from '../departments.controller';
import { CreateDepartmentDto } from '../dto/create-department.dto';

describe('DepartmentsController Unit Tests', () => {
  let controller: DepartmentsController;

  beforeEach(async () => {
    controller = new DepartmentsController();
  });

  it('should creates an department', async () => {
    //Arrange
    const output: CreateDepartmentOutput = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'Department name',
      created_at: '2011-10-05T14:48:00.000Z',
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    //@ts-expect-error defined part of methods
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateDepartmentDto = {
      name: 'Department Name',
    };

    //Act
    const result = await controller.create(input);

    //Assert
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(result).toStrictEqual(output);
  });

  it('should list departments', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: ListDepartmentsOutput = [
      {
        id,
        name: 'Department name',
        created_at: '2011-10-05T14:48:00.000Z',
      },
    ];
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['listUseCase'] = mockListUseCase;
    const result = await controller.findAll();
    expect(mockListUseCase.execute).toHaveBeenCalled();
    expect(result).toStrictEqual(output);
  });
});

import { CreateEmployeeOutput } from '../../../core/employee/application/use-cases/create-employee/create-employee.use-case';
import { GetEmployeeOutput } from '../../../core/employee/application/use-cases/get-employee/get-employee.use-case';
import { ListEmployeesOutput } from '../../../core/employee/application/use-cases/list-employees/list-employees.use-case';
import { UpdateEmployeeInput } from '../../../core/employee/application/use-cases/update-employee/update-employee.input';
import { UpdateEmployeeOutput } from '../../../core/employee/application/use-cases/update-employee/update-employee.use-case';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeesController } from '../employees.controller';

describe('EmployeesController Unit Tests', () => {
  let controller: EmployeesController;

  beforeEach(async () => {
    controller = new EmployeesController();
  });

  it('should creates an employee', async () => {
    //Arrange
    const output: CreateEmployeeOutput = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      first_name: 'First name',
      last_name: 'Last name',
      hire_date: '2011-10-05T14:48:00.000Z',
      department_id: '248de312-dfed-4e2e-a92e-2b355873bd55',
      phone: '9847584932',
      address: 'Address 1',
      created_at: '2011-10-05T14:48:00.000Z',
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    //@ts-expect-error defined part of methods
    controller['createUseCase'] = mockCreateUseCase;
    const input: CreateEmployeeDto = {
      first_name: 'First name',
      last_name: 'Last name',
      hire_date: '2011-10-05T14:48:00.000Z',
      department_id: '248de312-dfed-4e2e-a92e-2b355873bd55',
      phone: '9847584932',
      address: 'Address 1',
    };

    //Act
    const result = await controller.create(input);

    //Assert
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(result).toStrictEqual(output);
  });

  it('should updates an employee', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: UpdateEmployeeOutput = {
      id,
      first_name: 'First name',
      last_name: 'Last name',
      hire_date: '2011-10-05T14:48:00.000Z',
      department_id: '248de312-dfed-4e2e-a92e-2b355873bd55',
      phone: '9847584932',
      address: 'Address 1',
      created_at: '2011-10-05T14:48:00.000Z',
    };

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    //@ts-expect-error defined part of methods
    controller['updateUseCase'] = mockUpdateUseCase;
    const input: Omit<UpdateEmployeeInput, 'id'> = {
      first_name: 'First name',
      last_name: 'Last name',
      hire_date: '2011-10-05T14:48:00.000Z',
      department_id: '248de312-dfed-4e2e-a92e-2b355873bd55',
      phone: '9847584932',
      address: 'Address 1',
    };

    const result = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(result).toStrictEqual({
      id,
      first_name: 'First name',
      last_name: 'Last name',
      hire_date: '2011-10-05T14:48:00.000Z',
      department_id: '248de312-dfed-4e2e-a92e-2b355873bd55',
      phone: '9847584932',
      address: 'Address 1',
      created_at: '2011-10-05T14:48:00.000Z',
    });
  });

  it('should deletes an employee', async () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error defined part of methods
    controller['deleteUseCase'] = mockDeleteUseCase;
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets an employee', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: GetEmployeeOutput = {
      id,
      first_name: 'First name',
      last_name: 'Last name',
      hire_date: '2011-10-05T14:48:00.000Z',
      department_id: '248de312-dfed-4e2e-a92e-2b355873bd55',
      phone: '9847584932',
      address: 'Address 1',
      created_at: '2011-10-05T14:48:00.000Z',
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller['getUseCase'] = mockGetUseCase;
    const result = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(result).toStrictEqual(output);
  });

  it('should list employees', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const output: ListEmployeesOutput = [
      {
        id,
        first_name: 'First name',
        last_name: 'Last name',
        hire_date: '2011-10-05T14:48:00.000Z',
        department_id: '248de312-dfed-4e2e-a92e-2b355873bd55',
        phone: '9847584932',
        address: 'Address 1',
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

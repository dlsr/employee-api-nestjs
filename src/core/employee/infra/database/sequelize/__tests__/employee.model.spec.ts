import { DataType } from 'sequelize-typescript';
import { EmployeeModel } from '../employee.model';
import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { DepartmentModel } from '../../../../../department/infra/database/sequelize/department.model';
import { DepartmentSequelizeRepository } from '../../../../../department/infra/database/sequelize/department-sequelize.repository';
import { DepartmentFakeBuilder } from '../../../../../department/domain/department-fake.builder';

describe('EmployeeModel Integration Tests', () => {
  setupSequelize({ models: [EmployeeModel, DepartmentModel] });

  it('should map props correctly', () => {
    const attributesMap = EmployeeModel.getAttributes();
    const attributes = Object.keys(EmployeeModel.getAttributes());
    expect(attributes).toStrictEqual([
      'employee_id',
      'first_name',
      'last_name',
      'hire_date',
      'department_id',
      'phone',
      'address',
      'created_at',
    ]);

    const employeeIdAttr = attributesMap.employee_id;
    expect(employeeIdAttr).toMatchObject({
      field: 'employee_id',
      fieldName: 'employee_id',
      primaryKey: true,
      type: DataType.UUID(),
      allowNull: false,
    });

    const firstNameAttr = attributesMap.first_name;
    expect(firstNameAttr).toMatchObject({
      field: 'first_name',
      fieldName: 'first_name',
      allowNull: false,
      type: DataType.STRING(255),
    });

    const lastNameAttr = attributesMap.last_name;
    expect(lastNameAttr).toMatchObject({
      field: 'last_name',
      fieldName: 'last_name',
      allowNull: false,
      type: DataType.STRING(255),
    });

    const hireDateAttr = attributesMap.hire_date;
    expect(hireDateAttr).toMatchObject({
      field: 'hire_date',
      fieldName: 'hire_date',
      allowNull: false,
      type: DataType.DATE(3),
    });

    const departmentAttr = attributesMap.department_id;
    expect(departmentAttr).toMatchObject({
      field: 'department_id',
      fieldName: 'department_id',
      allowNull: false,
      type: DataType.UUIDV4(),
    });

    const phoneAttr = attributesMap.phone;
    expect(phoneAttr).toMatchObject({
      field: 'phone',
      fieldName: 'phone',
      allowNull: false,
      type: DataType.STRING(10),
    });

    const addressAttr = attributesMap.address;
    expect(addressAttr).toMatchObject({
      field: 'address',
      fieldName: 'address',
      allowNull: false,
      type: DataType.STRING({ length: 255 }),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: 'created_at',
      fieldName: 'created_at',
      allowNull: false,
      type: DataType.DATE(3),
    });
  });

  it('create and association relations', async () => {
    const department = new DepartmentFakeBuilder().build();
    const departmentRepo = new DepartmentSequelizeRepository(DepartmentModel);
    await departmentRepo.insert(department);

    const arrange = {
      employee_id: '1b04d964-bc17-4a91-8183-8a2e2d9f0d69',
      first_name: 'firstname',
      last_name: 'lastName',
      hire_date: new Date(),
      department_id: department.department_id.id,
      phone: '1234567890',
      address: 'Street Joao francisco 243',
      created_at: new Date(),
    };

    const employee = await EmployeeModel.create(arrange);
    expect(employee.toJSON()).toStrictEqual(arrange);
  });
});

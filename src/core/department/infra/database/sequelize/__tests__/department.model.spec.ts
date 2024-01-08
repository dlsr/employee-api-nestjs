import { DataType } from 'sequelize-typescript';
import { setupSequelize } from '../../../../../shared/infra/testing/setup-sequelize.helper';
import { DepartmentModel } from '../department.model';

describe('DepartmentModel Integration Tests', () => {
  setupSequelize({ models: [DepartmentModel] });

  it('should map props correctly', () => {
    const attributesMap = DepartmentModel.getAttributes();
    const attributes = Object.keys(DepartmentModel.getAttributes());
    expect(attributes).toStrictEqual(['department_id', 'name', 'created_at']);

    const departmentIdAttr = attributesMap.department_id;
    expect(departmentIdAttr).toMatchObject({
      field: 'department_id',
      fieldName: 'department_id',
      primaryKey: true,
      type: DataType.UUID(),
      allowNull: false,
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: 'name',
      fieldName: 'name',
      allowNull: false,
      type: DataType.STRING(255),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: 'created_at',
      fieldName: 'created_at',
      allowNull: false,
      type: DataType.DATE(3),
    });
  });

  it('create a new department', async () => {
    const arrange = {
      department_id: '1b04d964-bc17-4a91-8183-8a2e2d9f0d69',
      name: 'Department Name',
      created_at: new Date(),
    };
    const department = await DepartmentModel.create(arrange);
    expect(department.toJSON()).toStrictEqual(arrange);
  });
});

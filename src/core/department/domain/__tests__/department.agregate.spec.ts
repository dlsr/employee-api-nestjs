import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';
import { DepartmentFixture } from '../../testing/department.fixture';
import { DepartmentFakeBuilder } from '../department-fake.builder';
import {
  Department,
  DepartmentConstructorProps,
  DepartmentId,
} from '../department.aggregate';

describe('Department Unit Tests', () => {
  describe('department_id field', () => {
    const arrange = [
      { department_id: null },
      { department_id: undefined },
      { department_id: new DepartmentId() },
    ];
    it.each(arrange)('when id = %j', ({ department_id }) => {
      const department = new Department({
        department_id,
      } as DepartmentConstructorProps);
      expect(department.department_id).toBeInstanceOf(DepartmentId);

      if (department_id instanceof DepartmentId) {
        expect(department.department_id).toBe(department_id);
      }
    });
  });

  it('should create a department through constructor when all values are given', () => {
    const department = new Department({
      name: 'Department Name',
      created_at: '2011-10-05T14:48:00.000Z',
    });

    expect(department.department_id).toBeInstanceOf(DepartmentId);
    expect(department.name).toBe('Department Name');
    expect(department.created_at).toBe('2011-10-05T14:48:00.000Z');
  });

  it('should create a department through constructor when created_at is not given', () => {
    const department = new Department({
      name: 'Department Name',
    });

    expect(department.department_id).toBeInstanceOf(Uuid);
    expect(department.name).toBe('Department Name');
    expect(department.created_at).toBeDefined();
  });

  it('should create a department through create method', () => {
    const department = Department.create({
      name: 'Department Name',
    });

    expect(department.department_id).toBeInstanceOf(Uuid);
    expect(department.name).toBe('Department Name');
    expect(department.created_at).toBeDefined();
  });

  describe('invalid name', () => {
    const arrange = DepartmentFixture.arrangeInvalidName();
    it.each(arrange)('when name is $label', ({ value }) => {
      expect(value.entity.notification.hasErrors()).toBe(true);
      expect(value.entity.notification.toJSON()).toStrictEqual(value.expected);
    });
  });

  it('should change name', () => {
    const department = new DepartmentFakeBuilder().withName('Name').build();
    department.changeName('Updated name');
    expect(department.name).toBe('Updated name');
  });
});

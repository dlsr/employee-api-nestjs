import { EmployeeFakeBuilder } from '../../../domain/employee-fake.builder';
import { EmployeeOutputMapper } from './employee-output.mapper';

describe('EmployeeOutputMapper Unit Tests', () => {
  it('should convert an employee in output', () => {
    const entity = new EmployeeFakeBuilder().build();
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = EmployeeOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();

    expect(output).toStrictEqual({
      id: entity.employee_id.id,
      first_name: entity.first_name,
      last_name: entity.last_name,
      hire_date: entity.hire_date,
      department_id: entity.department_id.id,
      phone: entity.phone,
      address: entity.address,
      created_at: entity.created_at,
    });
  });
});

import { EmployeeId } from '../../../../employee/domain/employee.agregate';
import { InvalidUuidError } from '../uuid.vo';

describe('Uuid Unit Tests', () => {
  const validateSpy = jest.spyOn(EmployeeId.prototype as any, 'validate');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error when uuid is invalid', () => {
    expect(() => {
      new EmployeeId('invalid-uuid');
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should create a valid uuid', () => {
    const uuid = new EmployeeId();
    expect(uuid.id).toBeDefined();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should accept a valid uuid', () => {
    const uuid = new EmployeeId('aa26db93-ff61-40f3-b315-8f204f27ff2e');
    expect(uuid.id).toBe('aa26db93-ff61-40f3-b315-8f204f27ff2e');
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});

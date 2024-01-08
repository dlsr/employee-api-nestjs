import { ValueObject } from '../value-object';

describe('ValueObject Unit Tests', () => {
  it('should be equals', () => {
    const valueObject1 = new FakeValueObject('fake value obj', 12);
    const valueObject2 = new FakeValueObject('fake value obj', 12);
    expect(valueObject1.equals(valueObject2)).toBe(true);
  });

  it('should not be equals', () => {
    const valueObject1 = new FakeValueObject('fake value obj', 12);
    const valueObject2 = new FakeValueObject('fake value obj', 11);
    expect(valueObject1.equals(valueObject2)).toBe(false);
    expect(valueObject1.equals(null as any)).toBe(false);
    expect(valueObject1.equals(undefined as any)).toBe(false);
  });
});

class FakeValueObject extends ValueObject {
  constructor(
    readonly fakeProp1: string,
    readonly fakeProp2: number,
  ) {
    super();
  }
}

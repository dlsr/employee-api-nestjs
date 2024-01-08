import isEqual from 'lodash/isEqual';

export abstract class ValueObject {
  public equals(vo: this): boolean {
    if (
      vo === null ||
      vo === undefined ||
      vo.constructor.name !== this.constructor.name
    ) {
      return false;
    }

    return isEqual(vo, this);
  }
}

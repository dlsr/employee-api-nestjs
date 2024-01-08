import { AggregateRoot } from '../../shared/domain/aggregate-root';
import { Uuid } from '../../shared/domain/value-objects/uuid.vo';
import { DepartmentValidatorFactory } from './department.validator';

export type DepartmentConstructorProps = {
  department_id?: DepartmentId;
  name: string;
  created_at?: string;
};

export type DepartmentCreateCommand = {
  name: string;
};

export class DepartmentId extends Uuid {}

export class Department extends AggregateRoot {
  department_id: DepartmentId;
  name: string;
  created_at: string;

  constructor(props: DepartmentConstructorProps) {
    super();
    this.department_id = props.department_id ?? new DepartmentId();
    this.name = props.name;
    this.created_at = props.created_at ?? new Date().toISOString();
  }

  static create(props: DepartmentConstructorProps) {
    const department = new Department(props);
    department.validate();
    return department;
  }

  changeName(name: string): void {
    this.name = name;
    this.validate();
  }

  validate() {
    const validator = DepartmentValidatorFactory.create();
    return validator.validate(this.notification, this);
  }

  get entity_id() {
    return this.department_id;
  }

  toJSON() {
    return {
      department_id: this.department_id.id,
      name: this.name,
      created_at: this.created_at,
    };
  }
}

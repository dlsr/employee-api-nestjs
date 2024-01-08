import { Department } from './department.aggregate';

export class DepartmentFakeBuilder {
  private name: string = 'Information Technology';

  withName(value: string) {
    this.name = value;
    return this;
  }

  build(): Department {
    return Department.create({
      name: this.name,
    });
  }
}

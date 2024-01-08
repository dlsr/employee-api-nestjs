import { Department, DepartmentId } from '../../../domain/department.aggregate';
import { IDepartmentRepository } from '../../../domain/department.repository';
import { DepartmentModel } from './department.model';

export class DepartmentSequelizeRepository implements IDepartmentRepository {
  constructor(private departmentModel: typeof DepartmentModel) {}

  async insert(entity: Department): Promise<void> {
    await this.departmentModel.create({
      department_id: entity.department_id.id,
      name: entity.name,
      created_at: new Date(entity.created_at),
    });
  }

  async findAll(): Promise<Department[]> {
    const models = await this.departmentModel.findAll();
    return models.map((model) => {
      return new Department({
        department_id: new DepartmentId(model.department_id),
        name: model.name,
        created_at: model.created_at.toISOString(),
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(entity: Department): Promise<void> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(entity_id: DepartmentId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(entity_id: DepartmentId): Promise<Department | null> {
    const foundModel = await this._get(entity_id.id);
    return foundModel
      ? new Department({
          department_id: new DepartmentId(foundModel.department_id),
          name: foundModel.name,
          created_at: foundModel.created_at.toISOString(),
        })
      : null;
  }

  private async _get(id: string): Promise<DepartmentModel | null> {
    return this.departmentModel.findByPk(id);
  }

  getEntity(): new (...args: any[]) => Department {
    return Department;
  }
}

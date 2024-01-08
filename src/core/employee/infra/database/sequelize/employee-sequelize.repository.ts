import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Uuid } from '../../../../shared/domain/value-objects/uuid.vo';
import { Employee } from '../../../domain/employee.agregate';
import { IEmployeeRepository } from '../../../domain/employee.repository';
import { EmployeeModel } from './employee.model';
import { EmployeeModelMapper } from './employee-model.mapper';

export class EmployeeSequelizeRepository implements IEmployeeRepository {
  constructor(private employeeModel: typeof EmployeeModel) {}
  async insert(entity: Employee): Promise<void> {
    const model = EmployeeModelMapper.toModel(entity);
    await this.employeeModel.create(model.toJSON());
  }

  async update(entity: Employee): Promise<void> {
    const id = entity.employee_id.id;
    const foundModel = await this._get(id);
    if (!foundModel) {
      throw new NotFoundError(id, this.getEntity());
    }

    const model = EmployeeModelMapper.toModel(entity);
    await this.employeeModel.update(model.toJSON(), {
      where: { employee_id: id },
    });
  }

  async delete(entity_id: Uuid): Promise<void> {
    const id = entity_id.id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    await this.employeeModel.destroy({ where: { employee_id: id } });
  }

  async findById(entity_id: Uuid): Promise<Employee | null> {
    const foundModel = await this._get(entity_id.id);
    return foundModel ? EmployeeModelMapper.toEntity(foundModel) : null;
  }

  async findAll(): Promise<Employee[]> {
    const models = await this.employeeModel.findAll();
    return models.map((model) => {
      return EmployeeModelMapper.toEntity(model);
    });
  }

  private async _get(id: string): Promise<EmployeeModel | null> {
    return this.employeeModel.findByPk(id);
  }

  getEntity(): new (...args: any[]) => Employee {
    return Employee;
  }
}

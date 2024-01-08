import { IRepository } from '../../shared/domain/repository/respository.interface';
import { Department, DepartmentId } from './department.aggregate';

export interface IDepartmentRepository
  extends IRepository<Department, DepartmentId> {}

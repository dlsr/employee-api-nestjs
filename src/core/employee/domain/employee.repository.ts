import { IRepository } from '../../shared/domain/repository/respository.interface';
import { Uuid } from '../../shared/domain/value-objects/uuid.vo';
import { Employee } from './employee.agregate';

export interface IEmployeeRepository extends IRepository<Employee, Uuid> {}

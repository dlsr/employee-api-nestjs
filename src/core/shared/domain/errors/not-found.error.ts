import { Entity } from '../entity';

export class NotFoundError extends Error {
  constructor(id: any, entityClass: new (...args: any[]) => Entity) {
    super(`${entityClass.name} Not Found for ID: ${id}`);
    this.name = 'NotFoundError';
  }
}

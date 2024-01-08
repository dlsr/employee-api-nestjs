import { ValueObject } from './value-object';
import { NotificationErros } from './validators/notification';

export abstract class Entity {
  notification: NotificationErros = new NotificationErros();
  abstract get entity_id(): ValueObject;
  abstract toJSON(): any;
}

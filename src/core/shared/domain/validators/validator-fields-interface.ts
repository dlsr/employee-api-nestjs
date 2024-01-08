import { NotificationErros } from './notification';
export type FieldsErrors =
  | {
      [field: string]: string[];
    }
  | string;

export interface IValidatorFields {
  validate(notification: NotificationErros, data: any): boolean;
}

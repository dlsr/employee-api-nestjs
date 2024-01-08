import { validateSync } from 'class-validator';
import { IValidatorFields } from './validator-fields-interface';
import { NotificationErros } from './notification';

export abstract class ClassValidatorFields implements IValidatorFields {
  validate(notification: NotificationErros, data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      for (const error of errors) {
        const field = error.property;
        Object.values(error.constraints!).forEach((message) => {
          notification.addError(message, field);
        });
      }
    }
    return !errors.length;
  }
}

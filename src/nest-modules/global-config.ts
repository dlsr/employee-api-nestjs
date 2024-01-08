import { INestApplication, ValidationPipe } from '@nestjs/common';
import { EntityValidationErrorFilter } from './shared/filters/entity-validation-error.filter';
import { NotFoundErrorFilter } from './shared/filters/not-found-error.filter';

export function applyGlobalconfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );

  app.useGlobalFilters(
    new NotFoundErrorFilter(),
    new EntityValidationErrorFilter(),
  );
}

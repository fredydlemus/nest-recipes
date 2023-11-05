import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ResourceDTO } from '../dtos/resource.dto';
import { Observable, map } from 'rxjs';
import { ResponseDTO } from '../dtos/response.dto';

function isRelation(value) {
  return typeof value === 'object' && value !== null;
}

@Injectable()
export class FormatResponseInterceptor<T>
  implements NestInterceptor<T, ResponseDTO<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseDTO<T>> {
    return next.handle().pipe(
      map((data) => {
        if (context.switchToHttp().getResponse().statusCode === 204) {
          return {
            data: null,
          };
        }

        if (Array.isArray(data)) {
          return {
            data: data.map((item) => {
              const { id, ...rest } = item;

              return {
                id,
                attributes: rest,
                type: item.constructor.name.toLowerCase().replace('entity', ''),
              };
            }),
          };
        } else {
          const { id, ...rest } = data as ResourceDTO<T>;
          const relations = {};

          Object.keys(rest).forEach((key) => {
            if (isRelation(rest[key])) {
              relations[key] = rest[key];
              delete rest[key];
            }
          });

          return {
            data: {
              id,
              attributes: rest,
              type: data.constructor.name.toLowerCase().replace('entity', ''),
              relations,
            } as ResourceDTO<T>,
          };
        }
      }),
    );
  }
}

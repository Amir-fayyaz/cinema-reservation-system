import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { deepRemoveSensitiveFields } from '@shared/utils/deep-remove-fields';
import { map, Observable } from 'rxjs';

@Injectable()
export class GlobalApplicationInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<void> {
    return next.handle().pipe(map((data) => deepRemoveSensitiveFields(data)));
  }
}

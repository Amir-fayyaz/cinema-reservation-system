import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const getUser = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest<Request>().user;
});

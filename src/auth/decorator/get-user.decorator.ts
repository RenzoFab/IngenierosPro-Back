import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { User } from '../entities';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;
  if (!user) throw new InternalServerErrorException('User not found (request)');
  if (!data) {
    return user as User;
  }
  if (Array.isArray(data)) {
    return data.reduce((acc, key) => {
      if (user[key] !== undefined) {
        acc[key] = user[key];
      }
      return acc;
    }, {} as Partial<User>);
  }
  return user[data];
});

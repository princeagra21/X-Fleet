import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

type MaybeStringOrNumber = string | number | undefined | null;

// Returns the numeric headerId derived from req.user.userId or req.user.sub
export const HeaderId = createParamDecorator((data: unknown, ctx: ExecutionContext): number => {
  const req = ctx.switchToHttp().getRequest<FastifyRequest>();
  const user = (req as any).user as { userId?: MaybeStringOrNumber; sub?: MaybeStringOrNumber } | undefined;

  const raw = user?.userId ?? user?.sub;
  if (raw === undefined || raw === null) {
    throw new UnauthorizedException('Unauthorized');
  }

  const id = typeof raw === 'number' ? raw : parseInt(String(raw), 10);
  if (Number.isNaN(id)) {
    throw new UnauthorizedException('Unauthorized');
  }

  return id;
});

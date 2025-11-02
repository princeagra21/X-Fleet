import { CanActivate, ExecutionContext, Injectable, Type, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import type { FastifyRequest } from 'fastify';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access (just AuthGuard handles auth)
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const user = (request as any).user as { role?: string } | undefined;

    if (!user?.role) {
      throw new UnauthorizedException('Unauthorized');
    }

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      // As requested, respond as unauthorized when role mismatches
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}

// Optional: Factory-style guard for quick inline role checks, e.g., @UseGuards(AuthGuard, RoleGuard('SUPERADMIN'))
export function RoleGuard(...roles: string[]): Type<CanActivate> {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      const user = (request as any).user as { role?: string } | undefined;

      if (!user?.role) {
        throw new UnauthorizedException('Unauthorized');
      }

      if (!roles.includes(user.role)) {
        throw new UnauthorizedException('Unauthorized');
      }

      return true;
    }
  }

  return RoleGuardMixin;
}

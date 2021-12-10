import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY } from './checkPoliciy.decorator';
import { PolicyHandler } from './ipolicy.interface';
import RequestWithUser from '../auth/requestWithUser.interface';
import { CaslPrismaAbilityFactory } from './casl-prisma-ability';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private caslPrismaAbilityFactory: CaslPrismaAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    console.log(user);

    const ability = this.caslAbilityFactory.createForUser(user);

    console.log(ability);

    const ability2 = await this.caslPrismaAbilityFactory.create(user);

    console.log(ability2);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}

import { Ability, AbilityClass } from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import interploate from 'src/helpers/interploate';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

export type AppAbility = PrismaAbility<
  [
    string,
    Subjects<{
      User: User;
      Role: Role;
    }>,
  ]
>;

const AppAbility = PrismaAbility as AbilityClass<AppAbility>;

@Injectable()
export class CaslPrismaAbilityFactory {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}
  async create(user: User) {
    const permissions = await this.userService.findAllPermissions(user);

    console.log(permissions.name);

    const data2 = [];

    const permissionsArray = permissions.role
      .permissions as Prisma.JsonObject[];

    console.log('------------------');

    permissionsArray.map((permission) => {
      data2.push({
        action: permission.action,
        subject: permission.subject,
        conditions: permission.conditions,
      });
    });

    console.log(interploate(JSON.stringify(data2), { user }));

    return new Ability(data2);
  }
}

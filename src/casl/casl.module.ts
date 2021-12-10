import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CaslPrismaAbilityFactory } from './casl-prisma-ability';

@Module({
  imports: [UsersService],
  providers: [CaslAbilityFactory, CaslPrismaAbilityFactory, UsersService],
  exports: [CaslAbilityFactory, CaslPrismaAbilityFactory],
})
export class CaslModule {}

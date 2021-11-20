import { Module } from '@nestjs/common';
import { CaslModule } from 'src/casl/casl.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [CaslModule],
})
export class UsersModule {}

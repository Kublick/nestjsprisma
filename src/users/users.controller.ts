import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CheckPolicies } from 'src/casl/checkPoliciy.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/action.enum';
import { Article } from './article.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // ApiOkResponse formats swagger shcema response and expected return values
  // for an array we need to map the result then apply the serializer to the result
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(PoliciesGuard)
  @UseGuards(JwtAuthenticationGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  async findAll(): Promise<UserEntity[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  // JwtGuard will require that users has a cookie with a valid JWT
  @Post('create')
  // @UseGuards(JwtAuthenticationGuard)
  @ApiOkResponse({ type: UserEntity })
  async register(@Body() registrationData: CreateUserDto) {
    return this.usersService.register(registrationData);
  }

  //In order to serialize data to JSON, we need to use the ClassSerializerInterceptor
  // An return the Entity with the function findOne
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(LocalAuthGuard)
  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  getUserPermissions(@Body() user: UserEntity) {
    console.log('el user', user);
    return this.usersService.findAllPermissions(user);
  }
}

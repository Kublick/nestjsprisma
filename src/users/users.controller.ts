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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // ApiOkResponse formats swagger shcema response and expected return values
  @ApiOkResponse({ type: UserEntity })
  findAll() {
    return this.usersService.findAll();
  }

  // JwtGuard will require that users has a cookie with a valid JWT
  @Post('create')
  @UseGuards(JwtAuthenticationGuard)
  async register(@Body() registrationData: CreateUserDto) {
    return this.usersService.register(registrationData);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id: id } });
  }

  public async register(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.prismaService.user.create({
        data: {
          ...registrationData,
          password: hashedPassword,
        },
      });
      return createdUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('User with that email already exists');
        }
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async findByEmail(email: string) {
    const find = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    console.log(find);
    if (!find) {
      throw new UnauthorizedException('user with this email doesnt exist');
    }
    return find;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id: id } });
  }
}

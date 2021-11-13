import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id: id } });
  }

  async findByEmail(email: string) {
    const find = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    if (!find) {
      return new BadRequestException('A field is incorrect');
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

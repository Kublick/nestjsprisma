import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
import { PostgresErrorCode } from './postgresErrorCodes.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entity/auth.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registrationData: RegisterDto) {
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

  public async login(email: string, password: string): Promise<Auth> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException(`No user was found for email: ${email}`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}

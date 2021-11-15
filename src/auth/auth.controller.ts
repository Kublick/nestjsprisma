import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { Auth } from './entity/auth.entity';
import { LocalAuthGuard } from './local.auth.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
//Api Tags divides Swagger documentation into logical sections
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto, @Request() req) {
    return this.authService.register(registrationData);
  }
  //Local Auth Guard requires only email and password to add into the request object
  //Http code returns 200 if user is authenticated
  @ApiOkResponse({ type: Auth })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }
}

import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth } from './entity/auth.entity';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { LocalAuthGuard } from './local.auth.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
//Api Tags divides Swagger documentation into logical sections
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Local Auth Guard requires only email and password to add into the request object
  //Http code returns 200 if user is authenticated
  @ApiOkResponse({ type: Auth })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}

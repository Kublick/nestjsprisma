import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { Auth } from './entity/auth.entity';
// import { LocalAuthGuard } from './local.auth.guard';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
//Api Tags divides Swagger documentation into logical sections
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  //Local Auth Guard requires only email and password
  @UseGuards(LocalAuthGuard)
  async register(@Body() registrationData: RegisterDto, @Request() req) {
    console.log(req);
    return this.authService.register(registrationData);
  }

  @ApiOkResponse({ type: Auth })
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }
}

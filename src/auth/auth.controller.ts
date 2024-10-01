import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginDto, SendCodeEmailDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('code')
  sendCodeEmail(@Body() sendCodeEmailDto: SendCodeEmailDto) {
    return this.authService.sendCodeEmail(sendCodeEmailDto);
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}

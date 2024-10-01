import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, SendCodeEmailDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') login() {}

  @Post('code')
  sendCodeEmail(@Body() sendCodeEmailDto: SendCodeEmailDto) {
    return this.authService.sendCodeEmail(sendCodeEmailDto);
  }

  @Post('register/:company')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}

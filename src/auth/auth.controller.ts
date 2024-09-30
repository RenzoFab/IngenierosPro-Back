import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/:company')
  createUser(
    @Param('company') company: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.authService.createUser(company, createUserDto);
  }
}

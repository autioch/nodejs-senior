import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService, SignInResponse } from './auth.service';
import { SignInDto } from './dto/auth.input';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService, SignInResponse } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.input';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('input') input: SignUpDto): Promise<SignInResponse> {
    try {
      return this.authService.signUp(input);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}

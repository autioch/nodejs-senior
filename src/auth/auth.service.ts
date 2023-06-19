import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { ROLE } from 'src/consts';

import { CustomerService } from '../customer/customer.service';
import { SignUpDto } from './dto/auth.input';
import { RefreshToken, Tokens, TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async signUp(input: SignUpDto): Promise<Tokens> {
    const { email, password } = input;

    const existingCustomer = await this.customerService.findOne({
      where: { email },
    });

    if (existingCustomer) {
      throw new Error('An account with specified email already exists.');
    }

    const hashedPassword = await hash(password, 10);
    const customer = await this.customerService.create({
      email,
      password: hashedPassword,
      role: ROLE.User,
      verifyCode: randomBytes(4).toString('hex'),
    });

    return this.tokenService.generateTokens(customer);
  }

  async signIn(email: string, password: string): Promise<Tokens> {
    const customer = await this.customerService.findOne({
      where: { email },
    });

    if (
      !customer ||
      !customer.verified ||
      !compareSync(password, customer.password)
    ) {
      throw new NotFoundException('Invalid credentials');
    }

    return this.tokenService.generateTokens(customer);
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    let customer;

    try {
      const payload = await this.tokenService.verifyToken(refreshToken);

      customer = await this.customerService.findOne({
        where: { id: payload.sub },
      });
    } catch (err) {
      throw new UnauthorizedException('Token error');
    }

    if (!customer) {
      throw new UnauthorizedException('User not found');
    }

    if (!customer.verified) {
      throw new NotAcceptableException('User not verified');
    }

    return this.tokenService.generateTokens(customer);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash } from 'bcrypt';
import crypto from 'crypto';
import { ROLE } from 'src/consts';
import { Customer } from 'src/lib/entities/customer.entity';

import { CustomerService } from '../customer/customer.service';
import { SignUpDto } from './dto/auth.input';

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async signUp(input: SignUpDto): Promise<SignInResponse> {
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
      verifyCode: crypto.randomBytes(4).toString('hex'),
    });

    return this.generateTokens(customer);
  }

  async signIn(email: string, password: string): Promise<SignInResponse> {
    const customer = await this.customerService.findOne({
      where: { email },
    });

    if (!customer || compareSync(password, customer.password)) {
      throw new NotFoundException('Invalid credentials');
    }

    return this.generateTokens(customer);
  }

  async generateTokens(customer: Customer): Promise<any> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: customer.id,
        email: customer.email,
      },
      {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: customer.id,
      },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
      },
    );

    return { accessToken, refreshToken };
  }
}

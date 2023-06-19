import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { Customer } from 'src/lib/entities/customer.entity';

import { CustomerService } from '../customer/customer.service';

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
        secret: process.env.JWT_SECRET,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: customer.id,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return { accessToken, refreshToken };
  }
}

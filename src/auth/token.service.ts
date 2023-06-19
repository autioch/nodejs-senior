import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { ROLE } from 'src/consts';
import { CustomerService } from 'src/customer/customer.service';
import { Customer } from 'src/lib/entities/customer.entity';

export interface AccessToken {
  sub: string;
  email: string;
  role: ROLE;
}

export interface RefreshToken {
  sub: string;
  role: ROLE;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class TokenService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async generateTokens(customer: Customer): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: customer.id,
        email: customer.email,
        role: customer.role,
      },
      {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: customer.id,
        role: customer.role,
      },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(refreshToken: string): Promise<RefreshToken> {
    return this.jwtService.verifyAsync<RefreshToken>(refreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
  }
}

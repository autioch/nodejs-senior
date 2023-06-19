import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from 'src/customer/customer.service';
import { PrismaService } from 'src/prisma.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        CustomerService,
        JwtService,
        PrismaService,
        TokenService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  // mock db or clean after tests
  it.skip('should allow signUp', async () => {
    expect(
      await controller.signUp({
        email: 'autioch2@gmail.com',
        password: 'nebraska',
      }),
    ).toHaveProperty('accessToken');
  });

  it('should allow singIn with correct password', async () => {
    expect(
      await controller.signIn({
        email: 'user@gmail.com',
        password: 'randow-password',
      }),
    ).toHaveProperty('accessToken');
  });

  it('should not allow sign in with invalid password', async () => {
    await expect(
      controller.signIn({
        email: 'user@gmail.com',
        password: 'invalid password',
      }),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should allow refreshing valid token', async () => {
    const { accessToken, refreshToken } = await controller.signIn({
      email: 'user@gmail.com',
      password: 'randow-password',
    });

    expect(await controller.refresh(refreshToken)).toHaveProperty(
      'accessToken',
    );
  });
});

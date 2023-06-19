import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';

import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';

describe('Controller', () => {
  let Resolver: CustomerResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [],
      providers: [CustomerService, PrismaService, CustomerResolver, JwtService],
    }).compile();

    Resolver = module.get<CustomerResolver>(CustomerResolver);
  });

  it('should list all users', async () => {
    const result = ['user2@gmail.com', 'user@gmail.com'];

    expect((await Resolver.customers()).map(({ email }) => email)).toEqual(
      result,
    );
  });
  it('should find user by email', async () => {
    expect(
      (
        await Resolver.customer({
          where: { email: 'user@gmail.com' },
        })
      ).id,
    ).toEqual('9e391faf-64b2-4d4c-b879-463532920fd3');
  });

  // todo best - insert new user beforeEach
  it('should handle verification', async () => {
    const verificationCode = 'norway';

    await Resolver.updateCustomer({
      id: '9e391faf-64b2-4d4c-b879-463532920fd3',
      verifyCode: verificationCode,
      verified: false,
    });

    await expect(
      await Resolver.verifyCustomer({
        email: 'user@gmail.com',
        verifyCode: verificationCode,
      }),
    ).resolves;
  });
});

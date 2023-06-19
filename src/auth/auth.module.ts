import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { CustomerModule } from '../customer/customer.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    CustomerModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    TokenService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

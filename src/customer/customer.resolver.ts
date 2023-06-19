import { ConflictException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';

import { Customer } from '../lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  CreateCustomerInput,
  DeleteCustomerInput,
  GetCustomerInput,
  UpdateCustomerInput,
  VerifyCustomerInput,
} from './dto/customer.input';

@Resolver(() => Customer)
@UseGuards(AuthGuard)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(@Args('data') data?: GetCustomerInput) {
    return this.customerService.findAll(data);
  }

  @Query(() => Customer)
  async customer(@Args('data') { where }: GetCustomerInput) {
    return this.customerService.findOne({ where });
  }

  @Mutation(() => Customer)
  async createCustomer(@Args('input') input: CreateCustomerInput) {
    const existingCustomer = await this.customerService.findOne({
      where: input,
    });

    if (existingCustomer) {
      throw new ConflictException('Email already in use');
    }

    return this.customerService.create(input);
  }

  @Mutation(() => Customer)
  @SetMetadata('roles', ['ADMIN'])
  async updateCustomer(
    @Args('input') input: UpdateCustomerInput,
  ): Promise<Customer | null> {
    return this.customerService.update(input);
  }

  @Mutation(() => Customer)
  @SetMetadata('roles', ['ADMIN'])
  async deleteCustomer(
    @Args('input') input: DeleteCustomerInput,
  ): Promise<Customer | null> {
    return this.customerService.delete(input);
  }

  @Mutation(() => Customer)
  verifyCustomer(
    @Args('verifyCustomerInput') verifyCustomerInput: VerifyCustomerInput,
  ) {
    return this.customerService.verifyCustomer(verifyCustomerInput);
  }
}

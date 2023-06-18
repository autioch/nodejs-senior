import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Customer } from 'lib/entities/customer.entity';
import { PrismaService } from 'src/prisma.service';

import {
  DeleteCustomerInput,
  GetCustomerInput,
  UpdateCustomerInput,
} from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: GetCustomerInput) {
    return this.prisma.customer.findMany(params);
  }

  async findOne(params: GetCustomerInput) {
    const { where } = params;

    return this.prisma.customer.findUnique({
      where,
    });
  }

  async create(input: Prisma.CustomerUpsertArgs['create']): Promise<Customer> {
    return this.prisma.customer.create({ data: input });
  }

  async update(input: UpdateCustomerInput): Promise<Customer | null> {
    return this.prisma.customer.update({
      where: { id: input.id },
      data: input,
    });
  }

  async delete(input: DeleteCustomerInput): Promise<Customer | null> {
    const { id } = input;
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('User not found.');
    }

    return this.prisma.customer.delete({ where: { id } });
  }
}

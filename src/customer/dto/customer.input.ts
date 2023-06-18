import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ROLE } from 'src/consts';

@InputType()
export class WhereCustomerInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType()
export class GetCustomerInput {
  @Field(() => String, { nullable: true })
  cursor?: Prisma.CustomerWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => WhereCustomerInput, { nullable: true })
  where: WhereCustomerInput;
}

@InputType()
export class CreateCustomerInput {
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  role: ROLE;
}

@InputType()
export class UpdateCustomerInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  role?: ROLE;
}

@InputType()
export class DeleteCustomerInput {
  @Field(() => String, { nullable: true })
  id: string;
}

import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

export const customers: Prisma.CustomerUpsertArgs['create'][] = [
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd3',
    email: 'user@gmail.com',
    password: hashSync('randow-password', 10),
    verified: true,
    role: 'USER',
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd4',
    email: 'user2@gmail.com',
    password: hashSync('randow-password', 10),
    verified: true,
    role: 'ADMIN',
  },
];

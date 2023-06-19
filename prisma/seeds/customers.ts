import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export const customers: Prisma.CustomerUpsertArgs['create'][] = [
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd3',
    email: 'user@gmail.com',
    password: bcrypt.hashSync('randow-password', 10),
    role: 'USER',
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd4',
    email: 'user2@gmail.com',
    password: bcrypt.hashSync('randow-password', 10),
    role: 'ADMIN',
  },
];

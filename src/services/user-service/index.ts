import { prisma } from '../../plugins/prisma.plugin';
import { CreateUserPayload, UpdateUserPayload } from './types';
import bcrypt from 'bcrypt';

export const userService = {
  createUser: async (user: CreateUserPayload) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    return prisma.users.create({
      data: { ...user, password: hash },
    });
  },
  getUserByUsername: async (username: string) => {
    return prisma.users.findUnique({
      where: { username },
    });
  },
  getUserById: async (id: string) => {
    return prisma.users.findUnique({
      where: { id },
    });
  },
  updateUser: async (id: string, user: UpdateUserPayload) => {
    return prisma.users.update({ where: { id }, data: user });
  },
  deleteUser: async (id: string) => {
    return prisma.users.delete({ where: { id } });
  },
};

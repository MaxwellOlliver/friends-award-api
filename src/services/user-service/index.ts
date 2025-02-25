import { prisma } from '../../plugins/prisma.plugin';
import { CreateUserPayload, UpdateUserPayload } from './types';
import bcrypt from 'bcrypt';

export const userService = {
  createUser: async (user: CreateUserPayload) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    return prisma.user.create({
      data: { ...user, password: hash },
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
  getUserByUsername: async (username: string) => {
    return prisma.user.findUnique({
      where: { username },
    });
  },
  getUserById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
  updateUser: async (id: string, user: UpdateUserPayload) => {
    return prisma.user.update({ where: { id }, data: user });
  },
  deleteUser: async (id: string) => {
    return prisma.user.delete({ where: { id } });
  },
};

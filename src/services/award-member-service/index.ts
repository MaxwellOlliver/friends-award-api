import { prisma } from '../../plugins/prisma.plugin';
import { CreateAwardMemberPayload, UpdateAwardMemberPayload } from './types';

export const awardMemberService = {
  createAwardMember: async (payload: CreateAwardMemberPayload) => {
    return prisma.awardMember.create({
      data: {
        awardId: payload.awardId,
        userId: payload.userId,
        role: payload.role,
      },
    });
  },
  updateAwardMember: async (id: string, payload: UpdateAwardMemberPayload) => {
    return prisma.awardMember.update({
      where: { id },
      data: payload,
    });
  },
  deleteAwardMember: async (id: string) => {
    return prisma.awardMember.delete({
      where: { id },
    });
  },
};

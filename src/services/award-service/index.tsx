import { AwardMemberRole } from '@prisma/client';
import { prisma } from '../../plugins/prisma.plugin';
import { CreateAwardPayload, UpdateAwardPayload } from './types';
import { Pagination } from '../../types/pagination';

export const awardService = {
  createAward: async (payload: CreateAwardPayload) => {
    const award = await prisma.award.create({ data: payload });

    await prisma.awardMember.create({
      data: {
        awardId: award.id,
        userId: payload.createdBy,
        role: AwardMemberRole.OWNER,
      },
    });

    return award;
  },
  updateAward: async (id: string, payload: UpdateAwardPayload) => {
    return prisma.award.update({ where: { id }, data: payload });
  },
  deleteAward: async (id: string) => {
    return prisma.award.delete({ where: { id } });
  },
  getAward: async (id: string) => {
    return prisma.award.findUnique({ where: { id } });
  },
  getAwards: async (
    userId: string,
    isOwner: boolean,
    pagination: Pagination,
  ) => {
    const awards = await prisma.award.findMany({
      where: {
        members: {
          some: {
            userId,
            role: isOwner ? AwardMemberRole.OWNER : AwardMemberRole.MEMBER,
          },
        },
      },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      include: {
        members: true,
      },
    });

    return awards;
  },
};

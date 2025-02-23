import { AwardMemberRole } from '@prisma/client';
import { prisma } from '../../plugins/prisma.plugin';
import { AwardService } from './types';

export const awardService: AwardService = {
  createAward: async (payload) => {
    const award = await prisma.award.create({ data: payload });

    return award;
  },
  updateAward: async (id, userId, payload) => {
    return prisma.award.update({
      where: { id, members: { some: { userId, role: AwardMemberRole.OWNER } } },
      data: payload,
    });
  },
  deleteAward: async (id) => {
    return prisma.award.delete({ where: { id } });
  },
  getAward: async (criteria, include) => {
    const { id, ownerId } = criteria;

    return prisma.award.findUnique({
      where: {
        id,
        createdBy: ownerId,
      },
      include,
    });
  },
  getAwards: async (userId, isOwner, pagination) => {
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

    const total = await prisma.award.count({
      where: {
        members: {
          some: {
            userId,
            role: isOwner ? AwardMemberRole.OWNER : AwardMemberRole.MEMBER,
          },
        },
      },
    });

    return {
      data: awards,
      total,
    };
  },
};

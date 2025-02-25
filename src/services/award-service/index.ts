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
  updateAwardStatus: async (awardId, status) => {
    return prisma.award.update({
      where: { id: awardId },
      data: { status },
    });
  },
  addMember: async (payload) => {
    return prisma.awardMember.create({
      data: payload,
    });
  },
  removeMember: async (awardId, userId) => {
    await prisma.awardMember.delete({
      where: { awardId_userId: { awardId, userId } },
    });
  },
  getMembers: async (awardId, pagination) => {
    const members = await prisma.awardMember.findMany({
      where: { awardId },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });

    const total = await prisma.awardMember.count({
      where: { awardId },
    });

    return {
      data: members,
      total,
    };
  },
  getMember: async (awardId, userId) => {
    return prisma.awardMember.findUnique({
      where: {
        awardId_userId: {
          awardId,
          userId,
        },
      },
    });
  },
};

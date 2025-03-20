import { NomineeGroupService } from './types';
import { prisma } from '../../plugins/prisma.plugin';

export const nomineeGroupService: NomineeGroupService = {
  createNomineeGroup: async (nomineeGroup) => {
    return prisma.nomineeGroup.create({ data: nomineeGroup });
  },
  updateNomineeGroup: async (nomineeGroupId, payload) => {
    return prisma.nomineeGroup.update({
      where: { id: nomineeGroupId },
      data: payload,
    });
  },
  deleteNomineeGroup: async (nomineeGroupId) => {
    await prisma.nomineeGroup.delete({ where: { id: nomineeGroupId } });
  },
  getNomineeGroup: async (nomineeGroupId) => {
    return prisma.nomineeGroup.findUnique({
      where: {
        id: nomineeGroupId,
      },
    });
  },
};

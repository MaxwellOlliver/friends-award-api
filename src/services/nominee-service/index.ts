import { NomineeService } from './types';
import { prisma } from '../../plugins/prisma.plugin';

export const nomineeService: NomineeService = {
  createNominee: async (nominee) => {
    return prisma.nominee.create({ data: nominee });
  },
  updateNominee: async (nomineeId, payload) => {
    return prisma.nominee.update({
      where: { id: nomineeId },
      data: payload,
    });
  },
  deleteNominee: async (nomineeId) => {
    await prisma.nominee.delete({ where: { id: nomineeId } });
  },
  getNominee: async (nomineeId) => {
    return prisma.nominee.findUnique({
      where: {
        id: nomineeId,
      },
    });
  },
};

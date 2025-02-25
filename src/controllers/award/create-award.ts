import { FastifyRequest, FastifyReply } from 'fastify';
import { awardService } from '../../services/award-service';
import { logger } from '../../logger';
import { AwardMemberRole } from '@prisma/client';

type CreateAwardRequest = {
  Body: {
    name: string;
    description: string;
  };
};

export const createAward = async (
  req: FastifyRequest<CreateAwardRequest>,
  res: FastifyReply,
) => {
  const { sub } = req.user;
  const { name, description } = req.body;

  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: 'Creating award',
    trace: {
      id: traceId,
    },
  });

  const award = await awardService.createAward({
    name,
    description,
    createdBy: sub,
  });

  logger.info({
    msg: 'Award created - Attaching award member',
    trace: {
      id: traceId,
    },
  });

  await awardService.addMember({
    awardId: award.id,
    userId: sub,
    role: AwardMemberRole.OWNER,
  });

  return res.status(201).send(award);
};

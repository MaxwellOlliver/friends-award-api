import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { logger } from '../../logger';
import { awardService } from '../../services/award-service';
import { Conflict, Unauthorized } from '../../errors/http-error';

type AddMemberRequest = {
  Params: {
    id: string;
  };
  Body: {
    userId: string;
    // role?: AwardMemberRole;
  };
};

export const addMember = async (
  req: FastifyRequest<AddMemberRequest>,
  res: FastifyReply,
) => {
  const { id } = req.params;
  const { userId } = req.body;
  const { sub } = req.user;

  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: `Adding member ${userId} to award ${id}`,
    trace: {
      id: traceId,
    },
  });

  const award = await awardService.getAward({ id, ownerId: sub });

  if (!award) {
    throw new Unauthorized(
      'You are not allowed to add a member to this award',
      'UNAUTHORIZED',
      { id },
    );
  }

  const isMember = await awardService.getMember(award.id, userId);

  if (isMember) {
    throw new Conflict('User is already a member of this award', 'IS_MEMBER', {
      userId,
    });
  }

  await awardService.addMember({
    awardId: award.id,
    userId,
  });

  logger.info({
    msg: `Member ${userId} added to award ${id}`,
    trace: {
      id: traceId,
    },
  });

  return res.status(201).send({ data: null, success: true });
};

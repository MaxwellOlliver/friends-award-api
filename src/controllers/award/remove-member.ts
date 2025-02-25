import { FastifyReply } from 'fastify';

import { FastifyRequest } from 'fastify';
import { logger } from '../../logger';
import { awardService } from '../../services/award-service';
import { Unauthorized } from '../../errors/http-error';
import { AwardMemberRole } from '@prisma/client';

type RemoveMemberRequest = {
  Params: {
    awardId: string;
    userId: string;
  };
};

export const removeMember = async (
  req: FastifyRequest<RemoveMemberRequest>,
  res: FastifyReply,
) => {
  const { awardId, userId } = req.params;
  const { sub } = req.user;

  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: `Removing member ${sub} from award ${awardId}`,
    trace: {
      id: traceId,
    },
  });

  const member = await awardService.getMember(awardId, sub);

  if (!member || member.role !== AwardMemberRole.OWNER) {
    throw new Unauthorized(
      'You are not allowed to remove a member from this award',
      'UNAUTHORIZED',
      { id: awardId },
    );
  }

  await awardService.removeMember(awardId, userId);

  logger.info({
    msg: `Member ${sub} removed from award ${awardId}`,
    trace: {
      id: traceId,
    },
  });

  return res.status(204).send();
};

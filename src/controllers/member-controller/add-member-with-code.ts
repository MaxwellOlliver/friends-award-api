import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { logger } from '../../logger';
import { awardService } from '../../services/award-service';
import { Conflict, Unauthorized } from '../../errors/http-error';

type AddMemberRequest = {
  Params: {
    inviteCode: string;
  };
};

export const addMemberWithInviteCode = async (
  req: FastifyRequest<AddMemberRequest>,
  res: FastifyReply,
) => {
  const { inviteCode } = req.params;
  const { sub } = req.user;

  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: `Adding member ${sub} to award with invite code ${inviteCode}`,
    trace: {
      id: traceId,
    },
  });

  const award = await awardService.getAwardByInviteCode(inviteCode);

  if (!award) {
    throw new Unauthorized('Invalid invite code', 'INVALID_INVITE_CODE', {
      inviteCode,
    });
  }

  logger.info({
    msg: `Checking if member ${sub} is already a member of award ${award.id}`,
    trace: {
      id: traceId,
    },
  });

  const isMember = await awardService.getMember(award.id, sub);

  if (isMember) {
    throw new Conflict('You are already a member of this award', 'IS_MEMBER', {
      inviteCode,
    });
  }

  await awardService.addMember({
    awardId: award.id,
    userId: sub,
  });

  logger.info({
    msg: `Member ${sub} added to award with invite code ${inviteCode}`,
    trace: {
      id: traceId,
    },
  });

  return res.status(201).send({ data: null, success: true });
};

import { AwardStatus } from '@prisma/client';
import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { logger } from '../../logger';
import { awardService } from '../../services/award-service';
import { BadRequest, Unauthorized } from '../../errors/http-error';

type UpdateAwardStatusRequest = {
  Params: {
    id: string;
  };
  Body: {
    status: AwardStatus;
  };
};

export const updateAwardStatus = async (
  req: FastifyRequest<UpdateAwardStatusRequest>,
  res: FastifyReply,
) => {
  const { id } = req.params;
  const { status } = req.body;
  const { sub } = req.user;
  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: `Checking if award ${id} is owned by user ${sub}`,
    trace: {
      id: traceId,
    },
  });

  const award = await awardService.getAward({ id, ownerId: sub });

  if (!award) {
    throw new Unauthorized(
      'You are not allowed to update this award',
      'UNAUTHORIZED',
      { id },
    );
  }

  const conditions = [
    award.status === AwardStatus.WAITING && status !== AwardStatus.VOTING,
    award.status === AwardStatus.VOTING && status !== AwardStatus.FINISHED,
    award.status === AwardStatus.FINISHED,
  ];

  if (conditions.some((condition) => condition)) {
    throw new BadRequest('Invalid award status', 'INVALID_STATUS', {
      id,
      currentStatus: award.status,
      providedStatus: status,
    });
  }

  const updatedAward = await awardService.updateAwardStatus(id, status);

  logger.info({
    msg: `Award ${id} status updated to ${status}`,
    trace: {
      id: traceId,
    },
  });

  return res.status(200).send({ data: updatedAward, success: true });
};

import { FastifyReply } from 'fastify';

import { FastifyRequest } from 'fastify';
import { logger } from '../../logger';
import { awardService } from '../../services/award-service';
import { Unauthorized } from '../../errors/http-error';

type DeleteAwardRequest = {
  Params: {
    id: string;
  };
};

export const deleteAward = async (
  req: FastifyRequest<DeleteAwardRequest>,
  res: FastifyReply,
) => {
  const { sub } = req.user;
  const { id } = req.params;

  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: `Deleting award ${id}`,
    trace: {
      id: traceId,
    },
  });

  const award = await awardService.getAward({ ownerId: sub, id });

  if (!award) {
    throw new Unauthorized(
      'You are not allowed to delete this award',
      'UNAUTHORIZED',
      {
        id,
      },
    );
  }

  await awardService.deleteAward(id);

  logger.info({
    msg: `Award ${id} deleted`,
    trace: {
      id: traceId,
    },
  });

  return res.status(204).send();
};

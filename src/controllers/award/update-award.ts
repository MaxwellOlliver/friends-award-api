import { FastifyRequest, FastifyReply } from 'fastify';
import { awardService } from '../../services/award-service';
import { logger } from '../../logger';

type UpdateAwardRequest = {
  Params: {
    id: string;
  };
  Body: {
    name: string;
    description: string;
  };
};

export const updateAward = async (
  req: FastifyRequest<UpdateAwardRequest>,
  res: FastifyReply,
) => {
  const { sub } = req.user;
  const { id } = req.params;
  const { name, description } = req.body;

  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: `Updating award ${id}`,
    trace: {
      id: traceId,
    },
  });

  const award = await awardService.updateAward(id, sub, {
    name,
    description,
  });

  logger.info({
    msg: `Award ${id} updated`,
    trace: {
      id: traceId,
    },
  });

  return res.status(200).send({ data: award, success: true });
};

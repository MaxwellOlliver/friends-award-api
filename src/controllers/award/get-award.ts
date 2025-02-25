import { FastifyRequest, FastifyReply } from 'fastify';
import { awardService } from '../../services/award-service';

type GetAwardRequest = {
  Params: {
    id: string;
  };
};

export const getAward = async (
  req: FastifyRequest<GetAwardRequest>,
  res: FastifyReply,
) => {
  const { id } = req.params;

  const award = await awardService.getAward(
    { id },
    {
      members: true,
    },
  );

  return res.status(200).send({ data: award, success: true });
};

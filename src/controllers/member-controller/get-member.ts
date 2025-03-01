import { FastifyReply } from 'fastify';

import { FastifyRequest } from 'fastify';
import { awardService } from '../../services/award-service';

type GetMemberRequest = {
  Params: {
    id: string;
    userId: string;
  };
};

export const getMember = async (
  req: FastifyRequest<GetMemberRequest>,
  res: FastifyReply,
) => {
  const { id, userId } = req.params;

  const member = await awardService.getMember(id, userId);

  return res.status(200).send({ data: member, success: true });
};

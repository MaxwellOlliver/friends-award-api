import { FastifyRequest, FastifyReply } from 'fastify';
import { awardService } from '../../services/award-service';
import { ListRequest } from '../../types/pagination';

type ListAwardsRequest = {
  Querystring: ListRequest & {
    isOwner?: string;
    q?: string;
  };
};

export const listAwards = async (
  req: FastifyRequest<ListAwardsRequest>,
  res: FastifyReply,
) => {
  const { sub } = req.user;
  const { limit, page, isOwner = 'false', q } = req.query;

  const awards = await awardService.getAwards(sub, isOwner === 'true', {
    limit,
    page,
    q,
  });

  return res.status(200).send({ data: awards, success: true });
};

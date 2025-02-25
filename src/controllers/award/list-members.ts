import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { ListRequest } from '../../types/pagination';
import { awardService } from '../../services/award-service';

type ListMembersRequest = {
  Params: {
    id: string;
  };
  Querystring: ListRequest;
};

export const getMembers = async (
  req: FastifyRequest<ListMembersRequest>,
  res: FastifyReply,
) => {
  const { id } = req.params;
  const { limit, page } = req.query;

  const members = await awardService.getMembers(id, { limit, page });

  return res.status(200).send(members);
};

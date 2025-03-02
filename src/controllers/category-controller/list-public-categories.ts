import { FastifyRequest, FastifyReply } from 'fastify';
import { ListRequest } from '../../types/pagination';
import { categoryService } from '../../services/category-service';
import { logger } from '../../logger';

type ListPublicCategoriesRequest = {
  Querystring: ListRequest & {
    q?: string;
  };
};

export const listPublicCategories = async (
  req: FastifyRequest<ListPublicCategoriesRequest>,
  res: FastifyReply,
) => {
  const { limit, page, q } = req.query;

  logger.info({
    msg: 'Listing public categories',
    trace: {
      id: req.headers['x-trace-id'],
    },
  });

  const categories = await categoryService.getPublicCategories({
    limit,
    page,
    q,
  });

  return res.status(200).send({
    data: categories,
    success: true,
  });
};

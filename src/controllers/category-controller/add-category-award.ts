import { FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '../../logger';
import { NotFound } from '../../errors/http-error';
import { awardService } from '../../services/award-service';
import { categoryService } from '../../services/category-service';

type AddCategoryToAwardRequest = {
  Params: {
    awardId: string;
    categoryId: string;
  };
};

export const addCategoryToAward = async (
  req: FastifyRequest<AddCategoryToAwardRequest>,
  res: FastifyReply,
) => {
  const { sub } = req.user;
  const { awardId, categoryId } = req.params;
  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: 'Adding category to award',
    trace: {
      id: traceId,
    },
  });

  const award = await awardService.getAward({ id: awardId, ownerId: sub });

  if (!award) {
    throw new NotFound('Award not found', 'AWARD_NOT_FOUND', {
      awardId,
    });
  }

  const category = await categoryService.getCategory({
    id: categoryId,
  });

  if (!category) {
    throw new NotFound('Category not found', 'CATEGORY_NOT_FOUND', {
      categoryId,
    });
  }

  await awardService.addCategory(awardId, categoryId);

  logger.info({
    msg: 'Category added to award',
    trace: {
      id: traceId,
    },
  });

  return res.status(201).send({
    data: null,
    success: true,
  });
};

import { FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '../../logger';
import { categoryService } from '../../services/category-service';
import { awardService } from '../../services/award-service';
import { NotFound } from '../../errors/http-error';

type CreateCategoryRequest = {
  Body: {
    name: string;
    description: string;
  };
  Params: {
    awardId: string;
  };
};

export const createCategory = async (
  req: FastifyRequest<CreateCategoryRequest>,
  res: FastifyReply,
) => {
  const { sub } = req.user;
  const { name, description } = req.body;
  const { awardId } = req.params;
  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: 'Checking if award exists',
    trace: {
      id: traceId,
    },
  });

  const award = await awardService.getAward({ id: awardId });

  if (!award) {
    throw new NotFound('Award not found', 'AWARD_NOT_FOUND', {
      awardId,
    });
  }

  logger.info({
    msg: 'Creating category',
    trace: {
      id: traceId,
    },
  });

  const category = await categoryService.createCategory({
    name,
    description,
    createdBy: sub,
  });

  logger.info({
    msg: 'Adding category to award',
    trace: {
      id: traceId,
    },
  });

  await awardService.addCategory(awardId, category.id);

  logger.info({
    msg: 'Category created',
    trace: {
      id: traceId,
    },
  });

  return res.status(201).send({ data: category, success: true });
};

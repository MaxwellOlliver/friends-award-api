import { FastifyRequest, FastifyReply } from 'fastify';
import { awardService } from '../../services/award-service';
import { logger } from '../../logger';
import { AwardMemberRole } from '@prisma/client';
import { categoryService } from '../../services/category-service';

type CreateCategoryRequest = {
  Body: {
    name: string;
    description: string;
  };
};

export const createCategory = async (
  req: FastifyRequest<CreateCategoryRequest>,
  res: FastifyReply,
) => {
  const { sub } = req.user;
  const { name, description } = req.body;

  const traceId = req.headers['x-trace-id'];

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
    msg: 'Category created',
    trace: {
      id: traceId,
    },
  });

  return res.status(201).send({ data: category, success: true });
};

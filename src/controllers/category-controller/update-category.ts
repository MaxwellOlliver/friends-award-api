import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../../logger';
import { categoryService } from '../../services/category-service';
import { NotFound } from '../../errors/http-error';

type UpdateCategoryRequest = {
  Params: {
    categoryId: string;
  };
  Body: {
    name: string;
    description: string;
  };
};

export const updateCategory = async (
  req: FastifyRequest<UpdateCategoryRequest>,
  res: FastifyReply,
) => {
  const { sub } = req.user;
  const { categoryId } = req.params;
  const { name, description } = req.body;
  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: 'Updating category',
    trace: {
      id: traceId,
    },
  });

  const category = await categoryService.getCategory({
    id: categoryId,
    createdBy: sub,
  });

  if (!category) {
    throw new NotFound('Category not found', 'CATEGORY_NOT_FOUND', {
      categoryId,
    });
  }

  const updatedCategory = await categoryService.updateCategory(categoryId, {
    name,
    description,
  });

  logger.info({
    msg: 'Category updated',
    trace: {
      id: traceId,
    },
  });

  return res.status(200).send({
    data: updatedCategory,
    success: true,
  });
};

import { FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '../../logger';
import { categoryService } from '../../services/category-service';
import { NotFound } from '../../errors/http-error';
import { nomineeService } from '../../services/nominee-service';
import { nomineeGroupService } from '../../services/nominee-group-service';

type CreateNomineeRequest = {
  Body: {
    nominees: {
      name: string;
    }[];
  };
  Params: {
    categoryId: string;
  };
};

export const createNominee = async (
  req: FastifyRequest<CreateNomineeRequest>,
  res: FastifyReply,
) => {
  const { sub } = req.user;
  const { nominees } = req.body;
  const { categoryId } = req.params;
  const traceId = req.headers['x-trace-id'];

  logger.info({
    msg: 'Checking if category exists',
    trace: {
      id: traceId,
    },
  });

  const category = await categoryService.getCategory({
    id: categoryId,
  });

  if (!category) {
    throw new NotFound('Category not found', 'CATEGORY_NOT_FOUND', {
      categoryId,
    });
  }

  logger.info({
    msg: 'Creating category',
    trace: {
      id: traceId,
    },
  });

  let nomineeGroupId = category.nomineeGroupId;

  if (!nomineeGroupId) {
    logger.info({
      msg: 'Category has no nominee group, creating one',
      trace: {
        id: traceId,
      },
    });

    const nomineeGroup = await nomineeGroupService.createNomineeGroup({
      name: category.name,
      description: category.description,
      createdBy: sub,
    });

    logger.info({
      msg: 'Setting nominee group for category',
      trace: {
        id: traceId,
      },
    });

    await categoryService.setNomineeGroup(categoryId, nomineeGroup.id);

    nomineeGroupId = nomineeGroup.id;
  }

  logger.info({
    msg: 'Creating nominee',
    trace: {
      id: traceId,
    },
  });

  const createdNominees = await nomineeService.createNominees(
    nominees.map((nominee) => ({
      name: nominee.name,
      nomineeGroupId,
    })),
  );

  logger.info({
    msg: 'Nominees created',
    trace: {
      id: traceId,
    },
  });

  return res.status(201).send({
    data: createdNominees,
    success: true,
  });
};

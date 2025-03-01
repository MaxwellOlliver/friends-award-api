import { FastifyInstance } from 'fastify';
import { awardRoutesSchemas } from '../schemas/award.schema';
import * as controller from '../controllers/award-controller';

export default function awardRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.auth);

  fastify.get(
    '/awards',
    {
      schema: awardRoutesSchemas.GET_AWARDS,
    },
    controller.listAwards,
  );
  fastify.get(
    '/awards/:id',
    {
      schema: awardRoutesSchemas.GET_AWARD_BY_ID,
    },
    controller.getAward,
  );

  fastify.post(
    '/awards',
    {
      schema: awardRoutesSchemas.CREATE_AWARD,
    },
    controller.createAward,
  );

  fastify.delete(
    '/awards/:id',
    {
      schema: awardRoutesSchemas.DELETE_AWARD,
    },
    controller.deleteAward,
  );

  fastify.patch(
    '/awards/:id/status',
    {
      schema: awardRoutesSchemas.UPDATE_AWARD_STATUS,
    },
    controller.updateAwardStatus,
  );
}

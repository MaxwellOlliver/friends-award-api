import { FastifyInstance } from 'fastify';
import { awardController } from '../controllers/award.controller';
import { awardRoutesSchemas } from '../schemas/award.schema';

export default function awardRoutes(fastify: FastifyInstance) {
  const controller = awardController(fastify);

  fastify.get(
    '/awards',
    {
      preHandler: [fastify.auth],
      schema: awardRoutesSchemas.GET_AWARDS,
    },
    controller.getAwards,
  );
  fastify.get(
    '/awards/:id',
    {
      preHandler: [fastify.auth],
      schema: awardRoutesSchemas.GET_AWARD_BY_ID,
    },
    controller.getAward,
  );

  fastify.post(
    '/awards',
    {
      preHandler: [fastify.auth],
      schema: awardRoutesSchemas.CREATE_AWARD,
    },
    controller.createAward,
  );

  fastify.delete(
    '/awards/:id',
    {
      preHandler: [fastify.auth],
      schema: awardRoutesSchemas.DELETE_AWARD,
    },
    controller.deleteAward,
  );
}

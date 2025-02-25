import { FastifyInstance } from 'fastify';
import { awardRoutesSchemas } from '../schemas/award.schema';
import * as controller from '../controllers/award';

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

  fastify.put(
    '/awards/:id/status',
    {
      schema: awardRoutesSchemas.UPDATE_AWARD_STATUS,
    },
    controller.updateAwardStatus,
  );

  // Members
  fastify.post(
    '/awards/:id/members',
    {
      schema: awardRoutesSchemas.ADD_MEMBER,
    },
    controller.addMember,
  );

  fastify.delete(
    '/awards/:id/members/:userId',
    {
      schema: awardRoutesSchemas.REMOVE_MEMBER,
    },
    controller.removeMember,
  );

  fastify.get(
    '/awards/:id/members',
    {
      schema: awardRoutesSchemas.GET_MEMBERS,
    },
    controller.getMembers,
  );

  fastify.get(
    '/awards/:id/members/:userId',
    {
      schema: awardRoutesSchemas.GET_MEMBER,
    },
    controller.getMember,
  );

  fastify.delete(
    '/awards/:id/members/:userId',
    {
      schema: awardRoutesSchemas.REMOVE_MEMBER,
    },
    controller.removeMember,
  );
}

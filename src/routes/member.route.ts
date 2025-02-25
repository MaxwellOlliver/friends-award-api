import { FastifyInstance } from 'fastify';
import { memberRoutesSchemas } from '../schemas/member.schema';
import * as controller from '../controllers/member';

export default function memberRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.auth);

  fastify.post(
    '/awards/:id/members',
    {
      schema: memberRoutesSchemas.ADD_MEMBER,
    },
    controller.addMember,
  );

  fastify.get(
    '/awards/:id/members',
    {
      schema: memberRoutesSchemas.LIST_MEMBERS,
    },
    controller.listMembers,
  );

  fastify.get(
    '/awards/:id/members/:userId',
    {
      schema: memberRoutesSchemas.GET_MEMBER,
    },
    controller.getMember,
  );

  fastify.delete(
    '/awards/:id/members/:userId',
    {
      schema: memberRoutesSchemas.REMOVE_MEMBER,
    },
    controller.removeMember,
  );

  fastify.post(
    '/awards/invite/:inviteCode',
    {
      schema: memberRoutesSchemas.ADD_MEMBER_WITH_INVITE_CODE,
    },
    controller.addMemberWithInviteCode,
  );
}

import { FastifyInstance } from 'fastify';
import { userRoutesSchemas } from '../schemas/user.schema';
import * as controller from '../controllers/user';

export default function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/users/:id',
    {
      preHandler: [fastify.auth],
      schema: userRoutesSchemas.GET_USER_BY_ID,
    },
    controller.getUser,
  );
  fastify.get(
    '/users/me',
    {
      preHandler: [fastify.auth],
    },
    controller.getLoggedUser,
  );

  fastify.post(
    '/users',
    {
      preHandler: [fastify.auth],
      schema: userRoutesSchemas.CREATE_USER,
    },
    controller.createUser,
  );

  fastify.delete(
    '/users/:id',
    {
      preHandler: [fastify.auth],
    },
    controller.deleteUser,
  );
}

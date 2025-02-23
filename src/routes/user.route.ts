import { FastifyInstance } from 'fastify';
import { userController } from '../controllers/user.controller';
import { userRoutesSchemas } from '../schemas/user.schema';

export default function userRoutes(fastify: FastifyInstance) {
  const controller = userController(fastify);

  fastify.get(
    '/users/me',
    {
      preHandler: [fastify.auth],
    },
    controller.getLoggedUser,
  );

  fastify.get(
    '/users/:id',
    {
      preHandler: [fastify.auth],
      schema: userRoutesSchemas.GET_USER_BY_ID,
    },
    controller.getUser,
  );

  fastify.post('/users', controller.createUser);

  fastify.delete(
    '/users/:id',
    {
      preHandler: [fastify.auth],
    },
    controller.deleteUser,
  );
}

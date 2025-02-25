import { FastifyInstance } from 'fastify';
import * as controller from '../controllers/auth';

export default function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/login', controller.login);

  fastify.post(
    '/auth/refresh-token',
    {
      preHandler: [fastify.auth],
    },
    controller.refreshToken,
  );
  fastify.post(
    '/auth/logout',
    {
      preHandler: [fastify.auth],
    },
    controller.logout,
  );
}

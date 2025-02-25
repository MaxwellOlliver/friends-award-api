import { FastifyInstance } from 'fastify';
import * as controller from '../controllers/auth';

export default function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/login', controller.login);

  fastify.addHook('preHandler', fastify.auth);
  fastify.post('/auth/refresh-token', controller.refreshToken);
  fastify.post('/auth/logout', controller.logout);
}

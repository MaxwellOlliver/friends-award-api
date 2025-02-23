import { FastifyInstance } from 'fastify';
import { authController } from '../controllers/auth.controller';

export default function authRoutes(fastify: FastifyInstance) {
  const controller = authController(fastify);

  fastify.post('/auth/login', controller.login);
  fastify.post('/auth/refresh-token', controller.refreshToken);
  fastify.post('/auth/logout', controller.logout);
}

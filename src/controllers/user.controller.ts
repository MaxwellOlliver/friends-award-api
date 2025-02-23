import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { userService } from '../services/user-service';
import { CreateUserPayload } from '../services/user-service/types';
import { Conflict, NotFound } from '../errors/http-error';

export function userController(fastify: FastifyInstance) {
  return {
    createUser: async (
      request: FastifyRequest<{ Body: CreateUserPayload }>,
      reply: FastifyReply,
    ) => {
      const { username, password } = request.body;

      fastify.log.info(`Checking if user ${username} exists`);

      const userExists = await userService.getUserByUsername(username);

      if (userExists) {
        throw new Conflict('User already exists', 'USER_ALREADY_EXISTS');
      }

      const user = await userService.createUser({ username, password });

      return reply.status(201).send(user);
    },
    getUser: async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply,
    ) => {
      fastify.log.info({
        msg: `Getting user: ${request.params.id}`,
        trace: { id: request.headers['x-trace-id'] },
      });

      const user = await userService.getUserById(request.params.id);

      if (!user) {
        throw new NotFound('User not found', 'USER_NOT_FOUND', {
          id: request.params.id,
        });
      }

      return reply.status(200).send(user);
    },
    getLoggedUser: async (request: FastifyRequest, reply: FastifyReply) => {
      fastify.log.info(`Getting logged user: ${request.user.sub}`);

      const user = await userService.getUserById(request.user.sub);

      if (!user) {
        throw new NotFound('User not found', 'USER_NOT_FOUND', {
          id: request.user.sub,
        });
      }

      return reply.status(200).send(user);
    },
    deleteUser: async (request: FastifyRequest, reply: FastifyReply) => {
      fastify.log.info(`Deleting user: ${request.user.sub}`);

      await userService.deleteUser(request.user.sub);

      reply.clearCookie('refreshToken', {
        path: '/',
        httpOnly: true,
        secure: fastify.config.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return reply.status(204).send();
    },
  };
}

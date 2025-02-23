import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { userService } from '../services/user-service';
import { CreateUserPayload } from '../services/user-service/types';

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
        return reply.status(400).send({ message: 'Username already exists' });
      }

      const user = await userService.createUser({ username, password });

      const userData = {
        ...user,
        password: undefined,
      };

      return reply.status(201).send(userData);
    },
    getUser: async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply,
    ) => {
      fastify.log.info(`Getting user: ${request.params.id}`);

      const user = await userService.getUserById(request.params.id);

      if (!user) {
        return reply.status(404).send({ message: 'User not found' });
      }

      const userData = {
        ...user,
        password: undefined,
      };

      return reply.status(200).send(userData);
    },
    getLoggedUser: async (request: FastifyRequest, reply: FastifyReply) => {
      fastify.log.info(`Getting logged user: ${request.user.sub}`);

      const user = await userService.getUserById(request.user.sub);

      if (!user) {
        return reply.status(404).send({ message: 'User not found' });
      }

      const userData = {
        ...user,
        password: undefined,
      };

      return reply.status(200).send(userData);
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

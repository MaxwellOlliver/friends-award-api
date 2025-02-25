import { FastifyReply, FastifyRequest } from 'fastify';
import { userService } from '../../services/user-service';
import { Conflict } from '../../errors/http-error';
import { CreateUserPayload } from '../../services/user-service/types';
import { logger } from '../../logger';

export const createUser = async (
  request: FastifyRequest<{ Body: CreateUserPayload }>,
  reply: FastifyReply,
) => {
  const { username, password } = request.body;

  logger.info(`Checking if user ${username} exists`);

  const userExists = await userService.getUserByUsername(username);

  if (userExists) {
    throw new Conflict('User already exists', 'USER_ALREADY_EXISTS');
  }

  const user = await userService.createUser({ username, password });

  return reply.status(201).send(user);
};

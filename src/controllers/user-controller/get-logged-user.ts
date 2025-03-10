import { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '../../services/user-service';
import { logger } from '../../logger';
import { NotFound } from '../../errors/http-error';

export const getLoggedUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  logger.info({
    msg: `Getting logged user: ${request.user.sub}`,
    trace: { id: request.headers['x-trace-id'] },
  });

  const user = await userService.getUserById(request.user.sub);

  if (!user) {
    throw new NotFound('User not found', 'USER_NOT_FOUND', {
      id: request.user.sub,
    });
  }

  return reply.status(200).send({ data: user, success: true });
};

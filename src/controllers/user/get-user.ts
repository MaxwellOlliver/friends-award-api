import { FastifyRequest, FastifyReply } from 'fastify';
import { NotFound } from '../../errors/http-error';
import { userService } from '../../services/user-service';
import { logger } from '../../logger';

export const getUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  logger.info({
    msg: `Getting user: ${request.params.id}`,
    trace: { id: request.headers['x-trace-id'] },
  });

  const user = await userService.getUserById(request.params.id);

  if (!user) {
    throw new NotFound('User not found', 'USER_NOT_FOUND', {
      id: request.params.id,
    });
  }

  return reply.status(200).send({ data: user, success: true });
};

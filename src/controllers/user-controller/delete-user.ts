import { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '../../services/user-service';
import { logger } from '../../logger';

export const deleteUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  logger.info(`Deleting user: ${request.user.sub}`);

  await userService.deleteUser(request.user.sub);

  reply.clearCookie('refreshToken', {
    path: '/',
    httpOnly: true,
    secure: request.server.config.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return reply.status(204).send({ data: null, success: true });
};

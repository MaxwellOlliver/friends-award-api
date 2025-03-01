import { FastifyReply, FastifyRequest } from 'fastify';

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.clearCookie('refreshToken', {
    path: '/',
    httpOnly: true,
    secure: request.server.config.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return reply.status(204).send({ data: null, success: true });
};

import { FastifyRequest, FastifyReply } from 'fastify';
import { tryCatch } from '../../utils/try-catch';
import { userService } from '../../services/user-service';

export const refreshToken = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const [error] = await tryCatch(
    request.jwtVerify({
      onlyCookie: true,
      key: request.server.config.JWT_COOKIE_SECRET,
    }),
  );

  if (error || !request.user) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }

  const user = await userService.getUserById(request.user.sub);

  if (!user) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }

  const token = request.server.generateToken({ sub: user.id });
  const refreshToken = request.server.generateToken({ sub: user.id });

  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: request.server.config.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 24 * 60 * 60, // 10 days
    })
    .send({ data: { token }, success: true });
};

import { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '../../services/user-service';
import bcrypt from 'bcrypt';

export const login = async (
  request: FastifyRequest<{ Body: { username: string; password: string } }>,
  reply: FastifyReply,
) => {
  const { username, password } = request.body;

  const user = await userService.getUserByUsername(username);

  if (!user) {
    return reply.status(401).send({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return reply.status(401).send({ message: 'Invalid credentials' });
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
    .send({ token });
};

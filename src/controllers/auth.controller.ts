import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { userService } from '../services/user-service';
import bcrypt from 'bcrypt';
import { tryCatch } from '../utils/try-catch';

export function authController(fastify: FastifyInstance) {
  const isSecure = fastify.config.NODE_ENV === 'production';

  return {
    login: async (
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

      const token = fastify.generateToken({ sub: user.id });

      const refreshToken = fastify.generateToken({ sub: user.id });

      return reply
        .status(200)
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          httpOnly: true,
          secure: isSecure,
          sameSite: 'strict',
          maxAge: 2 * 24 * 60 * 60, // 10 days
        })
        .send({ token });
    },
    refreshToken: async (request: FastifyRequest, reply: FastifyReply) => {
      const [error] = await tryCatch(
        request.jwtVerify({
          onlyCookie: true,
          key: fastify.config.JWT_COOKIE_SECRET,
        }),
      );

      if (error || !request.user) {
        return reply.status(401).send({ message: 'Unauthorized' });
      }

      const user = await userService.getUserById(request.user.sub);

      if (!user) {
        return reply.status(401).send({ message: 'Unauthorized' });
      }

      const token = fastify.generateToken({ sub: user.id });
      const refreshToken = fastify.generateToken({ sub: user.id });

      return reply
        .status(200)
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          httpOnly: true,
          secure: isSecure,
          sameSite: 'strict',
          maxAge: 2 * 24 * 60 * 60, // 10 days
        })
        .send({ token });
    },
    logout: async (request: FastifyRequest, reply: FastifyReply) => {
      reply.clearCookie('refreshToken', {
        path: '/',
        httpOnly: true,
        secure: isSecure,
        sameSite: 'strict',
      });

      return reply.status(204).send();
    },
  };
}

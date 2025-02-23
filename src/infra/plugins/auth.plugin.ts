import fp from 'fastify-plugin';
import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import { tryCatch } from '../../utils/try-catch';

export default fp(
  async (fastify) => {
    await fastify.register(jwt, {
      secret: fastify.config.JWT_SECRET,
      cookie: {
        cookieName: 'refreshToken',
        signed: false,
      },
    });

    await fastify.register(cookie, {});

    fastify.decorate('generateToken', function (payload: { sub: string }) {
      const token = fastify.jwt.sign(
        {},
        {
          jti: String(Date.now()),
          expiresIn: fastify.config.JWT_EXPIRATION_TIME,
          sub: payload.sub,
        },
      );

      return token;
    });

    fastify.decorate(
      'auth',
      async (request: FastifyRequest, reply: FastifyReply) => {
        const [error] = await tryCatch(request.jwtVerify());

        if (error) {
          return reply.status(401).send(error);
        }
      },
    );
  },
  {
    name: 'auth',
  },
);
